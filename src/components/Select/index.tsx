import { colors } from "@/assets/cssVariables";
import { Select as CSelect, SelectProps, useColorMode } from "@chakra-ui/react";
import { ComponentPropsWithRef } from "react";

type Props = ComponentPropsWithRef<"select"> & SelectProps;

export function Select({
  children,
  variant = "filled",
  _focusVisible = { border: "none" },
  width = "auto",
  ...rest
}: Props) {
  const { colorMode } = useColorMode();

  const bgColor =
    colorMode === "light" ? colors.backgroundSecondary : colors.dark.backgroundSecondary;

  return (
    <CSelect
      bgColor={bgColor}
      variant={variant}
      _focusVisible={_focusVisible}
      width={width}
      {...rest}
    >
      {children}
    </CSelect>
  );
}
