import { colors } from "@/assets/cssVariables";
import {
  Button as ChakraButton,
  ButtonProps,
  useColorMode,
} from "@chakra-ui/react";
import { ComponentPropsWithRef } from "react";

type Props = ComponentPropsWithRef<"button"> & ButtonProps;

export function Button({ width = "auto", ...rest }: Props) {
  const { colorMode } = useColorMode();
  const bgColor =
    colorMode === "light" ? colors.brandMain : colors.dark.brandMain;

  const textColor =
    colorMode === "light" ? colors.fontMain : colors.dark.fontMain;
  return (
    <ChakraButton
      backgroundColor={bgColor}
      _hover={{ background: bgColor, opacity: 0.8 }}
      _focusVisible={{ boxShadow: "none", border: "none" }}
      color={textColor}
      width={width}
      {...rest}
    />
  );
}
