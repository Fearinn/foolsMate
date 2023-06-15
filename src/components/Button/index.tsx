import { colors } from "@/assets/cssVariables";
import { Button as ChakraButton } from "@chakra-ui/react";
import { ComponentProps, ReactNode } from "react";

type Props = {
  bgColor?: string;
  textColor?: string;
  width?: string;
} & ComponentProps<"button">;

export function Button({
  bgColor = colors.mainBrand,
  textColor = colors.mainFont,
  width = "auto",
  ...rest
}: Props) {
  return (
    <ChakraButton
      backgroundColor={bgColor}
      _hover={{ background: bgColor, opacity: 0.8 }}
      color={textColor}
      width={width}
      {...rest}
    />
  );
}
