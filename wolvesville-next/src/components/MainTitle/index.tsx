import { ReactNode } from "react";
import { Heading } from "@chakra-ui/react";

function MainTitle({ title }: { title: string | ReactNode }) {
  return <Heading as="h1">{title}</Heading>;
}

export { MainTitle };
