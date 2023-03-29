import { Spinner } from "@chakra-ui/react";
import { StyledLoader } from "./StyledLoader";

function Loader() {
  return (
    <StyledLoader>
      <Spinner size={"xl"} marginBottom={"1rem"} />
      <p>Data is being fetched...</p>
    </StyledLoader>
  );
}

export { Loader };
