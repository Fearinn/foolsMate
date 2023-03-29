import { ReactNode } from "react";
import { StyledErrorMessage } from "./StyledErrorMessage";

function ErrorMessage({
  children = "Sorry, an unexpected error has ocurred! Please try again later.",
}: {
  children?: ReactNode;
}) {
  return <StyledErrorMessage role="alert">{children}</StyledErrorMessage>;
}

export { ErrorMessage };
