import { Heading } from "@chakra-ui/react";
import { MainTitle } from "../../components/MainTitle";

function Home() {
  return (
    <main>
      <MainTitle title="Welcome to Wolvesville Wiki!" />
      <Heading size="md">{"What's new in Wolvesville?"}</Heading>
    </main>
  );
}

export { Home };
