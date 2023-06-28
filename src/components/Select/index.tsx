import { colors } from "@/assets/cssVariables";
import { Select as CSelect, SelectProps } from "@chakra-ui/react";
import { ComponentPropsWithRef } from "react";

type Props = ComponentPropsWithRef<"select"> & SelectProps;

export function Select({
  children,
  bgColor = colors.backgroundSecondary,
  variant = "filled",
  _focusVisible = { border: "none" },
  width = "auto",
  ...rest
}: Props) {
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
