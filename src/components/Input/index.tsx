import { colors } from "@/assets/cssVariables";
import { Input as ChakraInput, InputProps } from "@chakra-ui/react";
import { ComponentPropsWithRef } from "react";

type Props = { hasLabel?: boolean } & ComponentPropsWithRef<"input"> &
  InputProps;

export function Input({
  bgColor = colors.backgroundSecondary,
  textColor = colors.fontMain,
  width = "auto",
  type = "text",
  variant = "filled",
  _focusVisible = { border: "none" },
  size,
  placeholder,
  hasLabel = false,
  ...rest
}: Props) {
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
