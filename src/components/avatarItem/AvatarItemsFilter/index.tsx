import { Button, Input, Paginator, Select } from "@/components";
import { AvatarItem } from "@/components/avatarItem/avatarItems.types";
import { useAvatarItemStore } from "@/store/avatarItem";
import { FilterSet } from "@/types/FilterSet";
import { Rarity } from "@/types/Rarity";
import { Checkbox, useColorMode } from "@chakra-ui/react";
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
  const { colorMode } = useColorMode();

  const [isOpen, setIsOpen] = useState(false);

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
      gender: (gender as AvatarItem["gender"]) || undefined,
      rarity: (rarity as Rarity) || undefined,
      type: (type as AvatarItem["type"]) || undefined,
      event: event || undefined,
    });
  }

  const filterSet: FilterSet = {
    handleSubmit,
    selects: [
      {
        name: "itemsPerPage",
        handler: (value: string) =>
          setFilters({ ...filters, limit: Number(value) || 100 }),
        placeholder: "items per page",
        options: ["100", "250", "500", "1000"],
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
    <>
      <Button
        type="button"
        aria-controls="filters-controlled-region"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close filters" : "Open filters"}
      </Button>
      <div
        id="filters-controlled-region"
        className={styles["controlled-region"]}
      >
        <form
          className={styles["filters"]}
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <Checkbox
            colorScheme={colorMode === "light" ? "pink" : "purple"}
            size="lg"
            justifyContent={isOpen ? "center" : "flex-start"}
            checked={onlyFavorites}
            onChange={() => changeOnlyFavorites(!onlyFavorites)}
          >
            Only favorites
          </Checkbox>
          {isOpen &&
            filterSet.selects &&
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

          {isOpen &&
            filterSet.textInputs &&
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
          {isOpen && <Button type="submit">Filter</Button>}
        </form>

        {isOpen && numberOfPages > 1 && (
          <Paginator
            initialPage={(filters.page || 1) - 1}
            pageCount={numberOfPages}
            onPageChange={(event) =>
              setFilters({ ...filters, page: event.selected + 1 })
            }
          />
        )}
      </div>
    </>
  );
}

export { AvatarItemsFilters };
