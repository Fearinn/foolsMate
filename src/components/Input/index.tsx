import { colors } from "@/assets/cssVariables";
import {
  Input as ChakraInput,
  InputProps,
  useColorMode,
} from "@chakra-ui/react";
import { ComponentPropsWithRef } from "react";

type Props = { hasLabel?: boolean } & ComponentPropsWithRef<"input"> &
  InputProps;

export function Input({
  width = "auto",
  type = "text",
  variant = "filled",
  _focusVisible = { border: "none" },
  size,
  placeholder,
  hasLabel = false,
  ...rest
}: Props) {
  const { colorMode } = useColorMode();
  const bgColor =
    colorMode === "light" ? colors.backgroundSecondary : colors.dark.backgroundSecondary;

  const textColor =
    colorMode === "light" ? colors.fontMain : colors.dark.fontMain;
  return (
    <ChakraInput
      width={width}
      size={size || "md"}
      type={type}
      variant={variant}
      _focusVisible={_focusVisible}
      bgColor={bgColor}
      textColor={textColor}
      placeholder={placeholder}
      aria-label={!hasLabel ? placeholder : undefined}
      {...rest}
    />
  );
}
