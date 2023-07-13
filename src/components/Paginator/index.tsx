import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import styles from "./Paginator.module.scss";

const iconStyles = {
  size: 22,
};

type Props = ReactPaginateProps

export function Paginator(props: Props) {
  return (
    <ReactPaginate
      disableInitialCallback
      initialPage={1}
      breakLabel="..."
      nextLabel={<AiOutlineArrowRight {...iconStyles} />}
      pageRangeDisplayed={5}
      previousLabel={<AiOutlineArrowLeft {...iconStyles} />}
      renderOnZeroPageCount={null}
      nextClassName={styles.next}
      previousClassName={styles.previous}
      breakClassName={styles.break}
      containerClassName={styles.nav}
      pageClassName={styles.page}
      activeClassName={styles.active}
      {...props}
    />
  );
}
