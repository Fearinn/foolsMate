import { getRoles } from "@/services/roles";
import { getRotations } from "@/services/rotations";
import { useRoles } from "@/utils/hooks/roles";
import { useRotations } from "@/utils/hooks/rotations";
import { numberToList } from "@/utils/numberToList";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import {
  Button,
  ErrorMessage,
  Loader,
  MainTitle,
  Select,
  SpotCard,
} from "../../components";
import styles from "./MatchHelper.module.scss";
import { Info } from "../../components/MatchHelper/matchHelper.types";
import { BiCheck, BiExport } from "react-icons/bi";
import { useColorMode } from "@chakra-ui/react";
import { colors } from "@/assets/cssVariables";
import Head from "next/head";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  const initialFilter = { limit: 1000 };

  await queryClient.prefetchQuery({
    queryKey: ["getRoles", initialFilter],
    queryFn: () => getRoles(initialFilter),
    staleTime: 1000 * 60 * 30,
  });

  await queryClient.fetchQuery({
    queryKey: ["getRotations"],
    queryFn: () => getRotations(),
    staleTime: 1000 * 60 * 30,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
}

const iconStyles = {
  className: styles.icon,
  color: colors.fontMain,
  size: 20,
};

export default function MatchHelper() {
  const { data, isLoading, error } = useRoles({ limit: 1000 });

  const {
    data: rotationsData,
    isLoading: rotationsIsLoading,
    error: rotationError,
  } = useRotations();

  const [selectedSpots, setSelectedSpots] = useState<number[]>([]);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [matchStarted, setMatchtarted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [gameMode, setGameMode] = useState("");

  const { colorMode } = useColorMode();

  const cardRef = useRef<HTMLDivElement | null>();

  const [info, setInfo] = useState<Info>({
    unconfirmed: [],
    real: [],
    fake: [],
  });

  function writeInfo(info: Info) {
    let writtenUnconfirmed =
      info.unconfirmed.length > 0 ? `Unconfirmed - ` : "";

    info.unconfirmed.forEach((item) => {
      writtenUnconfirmed += JSON.stringify(item) + ", ";
    });

    let writtenReal = info.real.length > 0 ? `Real - ` : "";

    info.real.forEach((item) => {
      writtenReal += JSON.stringify(item) + ", ";
    });

    let writtenFake = info.fake.length > 0 ? `Fake - ` : "";

    info.fake.forEach((item) => {
      writtenFake += JSON.stringify(item) + ", ";
    });

    return `${writtenUnconfirmed} | ${writtenReal} | ${writtenFake}`
      .trim()
      .replaceAll("{", "")
      .replaceAll("}", "")
      .replaceAll(`"`, "")
      .replaceAll(",  |", " |")
      .replaceAll(":", " ")
      .replaceAll("|  |", "|")
      .replaceAll(/,$/gm, "")
      .replaceAll(/^\|\s*/gm, "")
      .replaceAll(/\|\s*$/g, "")
      .trim()
      .toLowerCase();
  }

  if (isLoading || rotationsIsLoading) return <Loader />;

  if (!data || error || !rotationsData || rotationError)
    return <ErrorMessage />;

  const sortedRoles = [
    ...data.items.sort((roleA, roleB) => {
      if (roleA.name < roleB.name) {
        return -1;
      }
      if (roleA.name > roleB.name) {
        return 1;
      }
      return 0;
    }),
  ];

  const possibleRoles =
    gameMode !== "custom"
      ? sortedRoles.filter((role) => {
          const selectedMode = rotationsData.find(
            (item) => item.gameMode === gameMode
          )?.roleRotations;
          return selectedMode?.some((rotation) =>
            rotation.roles.includes(role.id)
          );
        })
      : sortedRoles;

  const possibleSpots = numberToList(16);

  return (
    <>
      <Head>
        <title>Fool&apos;s Mate - Match Helper</title>
      </Head>
      <main className={styles.helper}>
        <div className={styles["pseudo-header"]}>
          <MainTitle title={"Match helper"} />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setMatchtarted(true);
            }}
          >
            <Button
              onClick={() => setInstructionsOpen(!instructionsOpen)}
              aria-expanded={instructionsOpen}
              aria-controls="instructions"
            >
              {instructionsOpen ? "Close instructions" : "See instructions"}
            </Button>
            {matchStarted ? (
              <>
                <Button
                  isDisabled={
                    info.unconfirmed.length +
                      info.real.length +
                      info.fake.length <=
                      0 || copied
                  }
                  onClick={() => {
                    navigator.clipboard.writeText(writeInfo(info));
                    setCopied(true);
                    setTimeout(() => setCopied(false), 3000);
                  }}
                >
                  {copied ? (
                    <>
                      Copied to clipboard
                      <BiCheck
                        {...{
                          ...iconStyles,
                          color:
                            colorMode === "light"
                              ? iconStyles.color
                              : colors.dark.fontMain,
                        }}
                      />
                    </>
                  ) : (
                    <>
                      Export info
                      <BiExport
                        {...{
                          ...iconStyles,
                          color:
                            colorMode === "light"
                              ? iconStyles.color
                              : colors.dark.fontMain,
                        }}
                      />
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => {
                    if (
                      !confirm(
                        "This will reset the match state and info. Are you sure?"
                      )
                    ) {
                      return;
                    }

                    if (cardRef.current) cardRef.current = null;
                    setInfo({
                      unconfirmed: [],
                      real: [],
                      fake: [],
                    });
                    setMatchtarted(false);
                  }}
                >
                  Reset
                </Button>
              </>
            ) : (
              <>
                <Button
                  aria-controls="spots"
                  onClick={() => setSelectedSpots(possibleSpots)}
                >
                  Select all
                </Button>
                <Button type="submit" isDisabled={selectedSpots.length < 4}>
                  Confirm and start
                </Button>
                <Select
                  required
                  aria-label="game mode"
                  placeholder="game mode"
                  onChange={(event) => setGameMode(event.target.value)}
                >
                  <option value="quick">Quick</option>
                  <option value="sandbox">Sandbox</option>
                  <option value="ranked-league-silver">Ranked silver</option>
                  <option value="ranked-league-gold">Ranked gold</option>
                  <option value="custom">Custom</option>
                </Select>
              </>
            )}
          </form>
        </div>
        <div id="instructions">
          {instructionsOpen && (
            <>
              <p>
                This feature is designed to help you to keep track of the state
                of your matches. Follow the steps below:
              </p>
              <ol>
                <li>
                  Select the game mode and the spots occupied by players. Custom
                  mode includes all roles in the database. Then, click{" "}
                  <strong>confirm and start</strong>;
                </li>
                <li>
                  For each player, you can select a role or an aura, when they
                  claim something or when you get some info. The possible roles
                  are those from the selected game mode;
                </li>
                <li>
                  You can use the buttons in the bottom to confirm someone as
                  real or fake. Press again to unconfirm.
                </li>
                <li>
                  An info text is generated according to your selections. You can
                  copy and paste it into the match chat;
                </li>
                <li>
                  If you don&apos;t want someone to be mentioned in the info
                  text (e.g. a dead player whose role is widely known), mark{" "}
                  <strong>hide from info</strong>;
                </li>
                <li>
                  Click <strong>reset</strong> to finish the match and start a
                  new setup.
                </li>
              </ol>
            </>
          )}
        </div>
        {matchStarted && <p aria-live="polite">Info: {writeInfo(info)}</p>}
        <div
          id="spots"
          role={matchStarted ? undefined : "listbox"}
          aria-label="spots"
          aria-orientation="horizontal"
          aria-multiselectable={!matchStarted}
          className={styles.grid}
        >
          {possibleSpots.map((number) => {
            return (
              <SpotCard
                key={`${number} ${matchStarted}`}
                possibleRoles={possibleRoles}
                active={selectedSpots.includes(number)}
                number={number}
                matchStarted={matchStarted}
                info={[info, setInfo]}
                onClick={() => {
                  if (selectedSpots.includes(number)) {
                    setSelectedSpots(
                      selectedSpots.filter(
                        (numberInList) => numberInList !== number
                      )
                    );
                    return;
                  }

                  setSelectedSpots([...selectedSpots, number]);
                }}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}
