import { useStore } from "@/store/filters";
import { IAvatarItemType } from "@/types/AvatarItem";
import { IFilterSet } from "@/types/FilterSet";
import { IRarity } from "@/types/Rarity";
import { handleGender } from "@/utils/handleGender";
import { numberToList } from "@/utils/numberToList";
import { Button, Input, Select } from "@chakra-ui/react";
import { useState } from "react";
import { colors } from "../../assets/cssVariables";
import { StyledAvatarItemFilters } from "./StyledAvatarItemFilters";

function AvatarItemsFilters({ numberOfPages }: { numberOfPages: number }) {
  const [gender, setGender] = useState("");
  const [rarity, setRarity] = useState("");
  const [type, setType] = useState("");
  const [event, setEvent] = useState("");
  const [filters, setFilters] = useStore((state) => [
    state.filters,
    state.updateFilters,
  ]);

  function handleSubmit() {
    setFilters({
      ...filters,
      gender: handleGender(gender),
      rarity: (rarity as IRarity) || undefined,
      type: (type as IAvatarItemType) || undefined,
      event: event || undefined,
    });
  }

  const filterSet: IFilterSet = {
    handleSubmit,
    selects: [
      {
        name: "page",
        handler: (value: string) =>
          setFilters({ ...filters, page: Number(value) || 1 }),
        placeholder: "page",
        options: numberToList(numberOfPages).map((number) => number.toString()),
      },
      {
        name: "itemsPerPage",
        handler: (value: string) =>
          setFilters({ ...filters, limit: Number(value) || 100 }),
        placeholder: "items per page",
        options: ["100", "200", "500", "1000"],
        default: "100",
      },
      {
        name: "gender",
        handler: (value: string) => setGender(value),
        placeholder: "gender",
        options: ["BOTH", "MALE", "FEMALE"],
      },
      {
        name: "rarity",
        handler: (value: string) => setRarity(value),
        placeholder: "rarity",
        options: ["COMMON", "RARE", "EPIC", "LEGENDARY"],
      },
      {
        name: "type",
        handler: (value: string) => setType(value),
        placeholder: "type",
        options: [
          "MOUTH",
          "HAIR",
          "FRONT",
          "SHIRT",
          "HAT",
          "BACK",
          "MASK",
          "GRAVESTONE",
          "GLASSES",
          "EYES",
          "BADGE",
        ],
      },
    ],
    textInputs: [
      {
        name: "event",
        handler: (value: string) => setEvent(value),
        placeholder: "event",
      },
    ],
  };

  return (
    <StyledAvatarItemFilters
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {filterSet.selects &&
        filterSet.selects.map((select, index) => {
          return (
            <Select
              defaultValue={select.default}
              key={index}
              placeholder={select.placeholder}
              width="auto"
              variant="filled"
              _focusVisible={{ border: "none" }}
              onChange={(event) => {
                select.handler(event.target.value);
              }}
            >
              {select.options.map((option) => {
                return (
                  <option key={option} value={option}>
                    {option}
                  </option>
                );
              })}
            </Select>
          );
        })}

      {filterSet.textInputs &&
        filterSet.textInputs.map((input, index) => {
          return (
            <Input
              width="auto"
              size="md"
              type="text"
              variant="filled"
              key={index}
              placeholder={input.placeholder}
              _focusVisible={{ border: "none" }}
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
    </StyledAvatarItemFilters>
  );
}

export { AvatarItemsFilters };
