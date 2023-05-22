import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        This is an unofficial website, which is not developed or endorsed by{" "}
        <a href="https://www.wolvesville.com/" target="_blank">
          Wolvesville GmbH & Co. KG
        </a>
        . All product names, logos, brands and trademarks are property of their
        respective owners.
      </p>
      <p>
        This website follows all{" "}
        <a href="https://api-docs.wolvesville.com/#/tos" target="_blank">
          Wolvesville Terms of Service
        </a>{" "}
        . All data is fetched ondemand from the{" "}
        <a href="https://api-docs.wolvesville.com/" target="_blank">
          official Wolvesville API
        </a>
        .
      </p>
      <p>Developed by Matheus Gomes (Fearinn).</p>
    </footer>
  );
}

export { Footer };
