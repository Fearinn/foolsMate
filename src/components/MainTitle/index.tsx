import { ReactNode } from "react";
import { Heading } from "@chakra-ui/react";

function MainTitle({ title }: { title: ReactNode }) {
  return (
    <Heading as="h1" textAlign={"center"}>
      {title}
    </Heading>
  );
}

export { MainTitle };
