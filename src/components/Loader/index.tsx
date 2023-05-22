import { Spinner } from "@chakra-ui/react";
import styles from "./Loader.module.scss";

function Loader() {
  return (
    <div className={styles.loader}>
      <Spinner size={"xl"} marginBottom={"1rem"} />
      <p>Data is being fetched...</p>
    </div>
  );
}

export { Loader };
