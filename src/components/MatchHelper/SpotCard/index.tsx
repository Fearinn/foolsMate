/* eslint-disable @next/next/no-img-element */
import { colors } from "@/assets/cssVariables";
import { Button, Select } from "@/components";
import { Info } from "@/components/MatchHelper/matchHelper.types";
import { Role } from "@/components/roles/roles.types";
import { Checkbox, Heading, useColorMode } from "@chakra-ui/react";
import classNames from "classnames";
import { Dispatch, SetStateAction, useState } from "react";
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";
import styles from "./SpotCard.module.scss";

type Props = {
  active: boolean;
  number: number;
  matchStarted: boolean;
  possibleRoles: Role[];
  onClick: () => void;
  info: [Info, Dispatch<SetStateAction<Info>>];
};

const iconStyles = {
  size: 24,
};

export function SpotCard({
  active,
  number,
  matchStarted,
  possibleRoles,
  onClick,
  info: [info, setInfo],
}: Props) {
  const [selectedRole, setSelectedRole] = useState("");
  const [aura, setAura] = useState("");
  const [confirmedReal, setConfirmedReal] = useState(false);
  const [confirmedFake, setConfirmedFake] = useState(false);
  const [hidden, setHidden] = useState(false);

  const { colorMode } = useColorMode();

  const roleObject = possibleRoles.find((role) => selectedRole === role.id);

  const imgHandler = {
    selected: roleObject?.image.url.replace(
      "random_village",
      "random_villager"
    ),
    random:
      "https://cdn.wolvesville.com/roleIcons/icon_default_random_all_filled.png",
    GOOD: "https://cdn.wolvesville.com/roleIcons/icon_default_random_villager_normal_filled.png",
    EVIL: "https://cdn.wolvesville.com/roleIcons/icon_default_random_werewolf_filled.png",
    UNKNOWN:
      "https://cdn.wolvesville.com/roleIcons/icon_default_random_voting_filled.png",
  };

  const fakeOrRealStyles = {
    [styles.inactive]: !active,
    [styles.real]: confirmedReal,
    [styles.fake]: confirmedFake,
  };

  const realOrFake = confirmedReal
    ? "real"
    : confirmedFake
    ? "fake"
    : "unconfirmed";

  return (
    <button
      role={matchStarted ? "toolbar" : "option"}
      aria-labelledby={`${number} title`}
      aria-selected={matchStarted ? undefined : active}
      className={classNames(styles["spot-card"], fakeOrRealStyles)}
      disabled={matchStarted && !active}
      onClick={matchStarted ? undefined : onClick}
    >
      <Heading as="h2" id={`${number} title`} size="md">
        {number}
      </Heading>
      {matchStarted && active && (
        <>
          <div className="sm-gap-flex-column">
            <Select
              aria-label={`role claim for ${number}`}
              placeholder="role claim"
              disabled={confirmedReal}
              backgroundColor={
                colorMode === "light"
                  ? colors.backgroundMain
                  : colors.dark.backgroundMain
              }
              value={selectedRole}
              onChange={(event) => {
                const role = possibleRoles.find(
                  (role) => role.id === event.target.value
                );

                setConfirmedFake(false);
                setSelectedRole(event.target.value);

                if (!role) {
                  setAura("");

                  setInfo({
                    ...info,
                    unconfirmed: info.unconfirmed.filter(
                      (item) => !item[number]
                    ),
                    fake: info.fake.filter((item) => !item[number]),
                  });
                  return;
                }

                setInfo({
                  ...info,
                  unconfirmed: [
                    ...info.unconfirmed.filter((item) => !item[number]),
                    { [number]: event.target.value },
                  ],
                  fake: info.fake.filter((item) => !item[number]),
                });

                setAura(role.aura);
              }}
            >
              {possibleRoles.map((role) => {
                return (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                );
              })}
            </Select>

            <Select
              aria-label={`${number}'s aura`}
              placeholder="aura"
              disabled={confirmedReal}
              backgroundColor={
                colorMode === "light"
                  ? colors.backgroundMain
                  : colors.dark.backgroundMain
              }
              width="100%"
              value={aura}
              onChange={(event) => {
                if (roleObject?.aura !== event.target.value) {
                  setSelectedRole("");
                  setInfo({
                    unconfirmed: [
                      ...info.unconfirmed.filter((item) => !item[number]),
                      { [number]: event.target.value },
                    ],
                    real: info.real.filter((item) => !item[number]),
                    fake: info.fake.filter((item) => !item[number]),
                  });
                }

                if (!selectedRole && !event.target.value) {
                  setInfo({
                    unconfirmed: info.unconfirmed.filter(
                      (item) => !item[number]
                    ),
                    real: info.real.filter((item) => !item[number]),
                    fake: info.fake.filter((item) => !item[number]),
                  });
                }
                setConfirmedFake(false);
                setAura(event.target.value);
              }}
            >
              <option value="GOOD">good</option>
              <option value="EVIL">evil</option>
              <option value="UNKNOWN">unknown</option>
            </Select>
          </div>

          <img
            role="presentation"
            alt=""
            src={
              selectedRole
                ? imgHandler.selected
                : imgHandler[aura as keyof typeof imgHandler] ||
                  imgHandler.random
            }
          ></img>
          <div className="md-gap-flex-row">
            <Button
              aria-label={`confirm ${number} as real`}
              title={`confirm ${number} as real`}
              backgroundColor={colors.positive}
              isDisabled={!selectedRole && !aura}
              onClick={() => {
                if (confirmedReal) {
                  setInfo({
                    unconfirmed: [
                      ...info.unconfirmed,
                      {
                        [number]: selectedRole || aura,
                      },
                    ],
                    real: info.real.filter((item) => !item[number]),

                    fake: info.fake.filter((item) => !item[number]),
                  });
                } else {
                  setInfo({
                    unconfirmed: info.unconfirmed.filter(
                      (item) => !item[number]
                    ),
                    real: [
                      ...info.real,
                      {
                        [number]: selectedRole || aura,
                      },
                    ],
                    fake: info.fake.filter((item) => !item[number]),
                  });
                }

                setConfirmedFake(false);
                setConfirmedReal(!confirmedReal);
              }}
            >
              <FaRegCircleCheck {...iconStyles} />
            </Button>
            <Button
              aria-label={`confirm ${number} as fake`}
              title={`confirm ${number} as fake`}
              backgroundColor={colors.negative}
              isDisabled={!selectedRole && !aura}
              onClick={() => {
                if (confirmedFake) {
                  setInfo({
                    unconfirmed: [
                      ...info.unconfirmed,
                      {
                        [number]: selectedRole || aura,
                      },
                    ],
                    real: info.real.filter((item) => !item[number]),

                    fake: info.fake.filter((item) => !item[number]),
                  });
                } else {
                  setInfo({
                    unconfirmed: info.unconfirmed.filter(
                      (item) => !item[number]
                    ),
                    real: info.real.filter((item) => !item[number]),
                    fake: [
                      ...info.fake,
                      {
                        [number]: selectedRole || aura,
                      },
                    ],
                  });
                }
                setConfirmedReal(false);
                setConfirmedFake(!confirmedFake);
              }}
            >
              <FaRegCircleXmark {...iconStyles} />
            </Button>
          </div>
          <Checkbox
            colorScheme={colorMode === "light" ? "pink" : "purple"}
            textTransform="none"
            onChange={() => {
              if (hidden) {
                if (
                  !confirmedReal &&
                  !confirmedFake &&
                  (selectedRole || aura)
                ) {
                  setInfo({
                    ...info,
                    unconfirmed: [
                      ...info.unconfirmed,
                      { [number]: selectedRole || aura },
                    ],
                  });
                }

                if (confirmedReal) {
                  setInfo({
                    ...info,
                    real: [...info.real, { [number]: selectedRole || aura }],
                  });
                }

                if (confirmedFake) {
                  setInfo({
                    ...info,
                    fake: [...info.fake, { [number]: selectedRole || aura }],
                  });
                }
              } else {
                setInfo({
                  unconfirmed: info.unconfirmed.filter((item) => !item[number]),
                  real: info.real.filter((item) => !item[number]),
                  fake: info.fake.filter((item) => !item[number]),
                });
              }

              setHidden(!hidden);
            }}
          >
            Hide {number} from info
          </Checkbox>
          <p className={classNames(fakeOrRealStyles)}>{realOrFake}</p>
        </>
      )}
    </button>
  );
}
