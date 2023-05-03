import { Heading } from "@chakra-ui/react";
import { BattlePass } from "../../components/BattlePass";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Loader } from "../../components/Loader";
import { MainTitle } from "../../components/MainTitle";
import { useBattlePassSeason } from "../../utils/hooks/useBattlePassSeason";
import { StyledHome } from "./StyledHome";

function Home() {
  const { data, isLoading, error } = useBattlePassSeason(["AVATAR_ITEM"]);

  if (isLoading)
    return (
      <StyledHome>
        <Loader />
      </StyledHome>
    );

  if (!data || error) {
    return (
      <StyledHome>
        <ErrorMessage />
      </StyledHome>
    );
  }
  return (
    <StyledHome>
      <MainTitle title="Welcome to Wolvesville Wiki!" />
      <Heading size="md">{"What's new in Wolvesville?"}</Heading>
      <BattlePass {...data}></BattlePass>
    </StyledHome>
  );
}

export default Home;
