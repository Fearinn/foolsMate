import { ReactNode } from "react";
import styles from "./ErrorMessage.module.scss";

function ErrorMessage({
  children = "Sorry, an unexpected error has ocurred! Please try again later.",
}: {
  children?: ReactNode;
}) {
  return (
    <p className={styles["error-message"]} role="alert">
      {children}
    </p>
  );
}

export { ErrorMessage };
