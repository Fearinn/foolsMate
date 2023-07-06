import { Button, Input, Select } from "@/components";
import {
  AvatarItemGender,
  AvatarItemType,
} from "@/components/avatarItem/avatarItems.types";
import { useAvatarItemStore } from "@/store/avatarItem";
import { FilterSet } from "@/types/FilterSet";
import { Rarity } from "@/types/Rarity";
import { handlePages } from "@/utils/handlePages";
import { numberToList } from "@/utils/numberToList";
import { Checkbox } from "@chakra-ui/react";
import { useState } from "react";
import styles from "./AvatarItemFilters.module.scss";

type Props = {
  numberOfPages: number;
  onlyFavorites: boolean;
  changeOnlyFavorites: (value: boolean) => void;
};

function AvatarItemsFilters({
  numberOfPages,
  onlyFavorites,
  changeOnlyFavorites,
}: Props) {
  const [gender, setGender] = useState("");
  const [rarity, setRarity] = useState("");
  const [type, setType] = useState("");
  const [event, setEvent] = useState("");
  const [id, setId] = useState("");
  const [filters, setFilters] = useAvatarItemStore((state) => [
    state.filters,
    state.updateFilters,
  ]);

  function handleSubmit() {
    setFilters({
      ...filters,
      page: 1,
      id: id || undefined,
      gender: (gender as AvatarItemGender) || undefined,
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
        options: handlePages(numberToList(numberOfPages), filters.page),
      },
      {
        name: "itemsPerPage",
        handler: (value: string) =>
          setFilters({ ...filters, page: 1, limit: Number(value) || 100 }),
        placeholder: "items per page",
        options: ["100", "200", "500", "1000"],
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
        name: "id",
        handler: (value: string) => setId(value),
        placeholder: "id",
      },
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
              key={index}
              placeholder={select.placeholder}
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
              key={index}
              disabled={onlyFavorites && input.name === "id"}
              placeholder={input.placeholder}
              onChange={(event) => input.handler(event.target.value)}
            />
          );
        })}
      <Button type="submit">Filter</Button>
      <Checkbox
        size="lg"
        type="checkbox"
        aria-checked={onlyFavorites}
        onChange={() => changeOnlyFavorites(!onlyFavorites)}
      >
        Only favorites
      </Checkbox>
    </form>
  );
}

export { AvatarItemsFilters };
