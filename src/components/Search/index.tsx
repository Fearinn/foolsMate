import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useState } from "react";

function Search() {
  const [search, setSearch] = useState("");
  return (
    <InputGroup width={"auto"}>
      <InputLeftElement
        pointerEvents="none"
        children={
          <Search2Icon
            color={"black"}
            w={4}
            h={4}
            padding={0}
            marginBottom={2}
          />
        }
      />
      <Input
        _focus={{ background: "rgb(237,242,237)" }}
        focusBorderColor="black"
        color={"black"}
        _placeholder={{ opacity: 1, color: "black" }}
        width={"auto"}
        size={"sm"}
        variant="filled"
        placeholder="Filter the result by name"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </InputGroup>
  );
}

export default Search;
