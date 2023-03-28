import { Select, Input, Button } from "@chakra-ui/react";
import { colors } from "../../assets/cssVariables";
import { IFilters } from "../../types/Filters";
import { StyledFilters } from "./StyledFilters";

function Filters({ selects, textInputs, handleSubmit }: IFilters) {
  return (
    <StyledFilters
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {selects &&
        selects.map((select, index) => (
          <Select
            key={index}
            placeholder={select.placeholder}
            width="auto"
            variant="filled"
            _focusVisible={{border: "none"}}
            onChange={(event) => {
              let defaultValue: number | string = "";
              select.options.forEach((option) => {
                if (option.default) {
                  defaultValue = option.value;
                }
              });
              select.handler(event.target.value || defaultValue);
            }}
          >
            {select.options.map((option) => {
              return (
                <option key={option.value} value={option.value}>{`${
                  option.name
                }${option.default ? " (default)" : ""}`}</option>
              );
            })}
          </Select>
        ))}

      {textInputs &&
        textInputs.map((input, index) => {
          return (
            <Input
              width="auto"
              size="md"
              type="text"
              variant="filled"
              key={index}
              placeholder={input.placeholder}
              _focusVisible={{border: "none"}}
              onChange={(event) => input.handler(event.target.value)}
            />
          );
        })}

      <Button
        type="submit"
        backgroundColor={colors.mainBrand}
        _hover={{ background: colors.mainBrand, opacity: 0.8 }}
        color={colors.mainFont}
      >
        Filter
      </Button>
    </StyledFilters>
  );
}

export { Filters };
