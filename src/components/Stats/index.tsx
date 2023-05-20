import { IResponseData } from "@/types/ResponseData";
import styles from "./Stats.module.scss";

function Stats({
  count,
  currentPage,
  totalCount,
}: Omit<IResponseData<unknown>, "items">) {
  return (
    <div className={styles.stats}>
      <p>
        Results in this page: <span>{count}</span>
      </p>
      <p>
        Current page: <span>{currentPage}</span>
      </p>
      <p>
        Total of results: <span>{totalCount}</span>
      </p>
    </div>
  );
}

export { Stats };
