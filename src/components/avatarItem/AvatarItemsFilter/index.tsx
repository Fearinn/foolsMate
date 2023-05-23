import {
  AvatarItemGender,
  AvatarItemType
} from "@/components/avatarItem/types/AvatarItem";
import { useAvatarItemStore } from "@/store/avatarItem";
import { FilterSet } from "@/types/FilterSet";
import { Rarity } from "@/types/Rarity";
import { numberToList } from "@/utils/numberToList";
import { Button, Input, Select } from "@chakra-ui/react";
import { useState } from "react";
import { colors } from "../../../assets/cssVariables";
import styles from "./AvatarItemFilters.module.scss";

function AvatarItemsFilters({ numberOfPages }: { numberOfPages: number }) {
  const [gender, setGender] = useState("");
  const [rarity, setRarity] = useState("");
  const [type, setType] = useState("");
  const [event, setEvent] = useState("");
  const [filters, setFilters] = useAvatarItemStore((state) => [
    state.filters,
    state.updateFilters,
  ]);

  function handleSubmit() {
    setFilters({
      ...filters,
      gender: gender as AvatarItemGender,
      rarity: (rarity as Rarity) || undefined,
      type: (type as AvatarItemType) || undefined,
      event: event || undefined,
    });
  }

  const filterSet: FilterSet = {
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
        options: ["NEUTRAL", "MALE", "FEMALE"],
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
    <form
      className={styles["avatar-item-filters"]}
      onSubmit={(event) => {
        event.preventDefault();
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
    </form>
  );
}

export { AvatarItemsFilters };

