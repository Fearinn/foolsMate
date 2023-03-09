import StyledFooter from "./StyledFooter";

function Footer() {
  return (
    <StyledFooter>
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
        <a target="_blank">Wolvesville Terms of Service</a> . All data is
        fetched ondemand from the{" "}
        <a href="https://api-docs.wolvesville.com/" target="_blank">
          official Wolvesville API
        </a>
        .
      </p>
      <p>Developed by Matheus Gomes (Fearinn).</p>
    </StyledFooter>
  );
}

export default Footer;
