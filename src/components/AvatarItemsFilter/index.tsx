import { useStore } from "@/store/filters";
import { IAvatarItemType } from "@/types/AvatarItem";
import { IFilters } from "@/types/Filters";
import { IRarity } from "@/types/Rarity";
import { handleGender } from "@/utils/handleGender";
import { numberToList } from "@/utils/numberToList";
import { Button, Input, Select } from "@chakra-ui/react";
import { useState } from "react";
import { colors } from "../../assets/cssVariables";
import { StyledFilters } from "./StyledFilters";

function Filters({ numberOfPages }: { numberOfPages: number }) {
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

  const filterSet: IFilters = {
    handleSubmit,
    selects: [
      {
        name: "page",
        handler: (value: string) =>
          setFilters({ ...filters, page: Number(value) || 1 }),
        placeholder: "page",
        options: numberToList(numberOfPages).map((number) => {
          return {
            name: number.toString(),
            value: number,
          };
        }),
      },
      {
        name: "itemsPerPage",
        handler: (value: string) =>
          setFilters({ ...filters, limit: Number(value) || 100 }),
        placeholder: "items per page",
        options: [
          {
            name: "100",
            value: 100,
            default: true,
          },
          {
            name: "200",
            value: 200,
          },
          { name: "500", value: 500 },
          {
            name: "1000",
            value: 1000,
          },
        ],
      },
      {
        name: "gender",
        handler: (value: string) => setGender(value),
        placeholder: "gender",
        options: [
          {
            name: "both",
            value: "BOTH",
          },
          {
            name: "male",
            value: "MALE",
          },
          {
            name: "female",
            value: "FEMALE",
          },
        ],
      },
      {
        name: "rarity",
        handler: (value: string) => setRarity(value),
        placeholder: "rarity",
        options: [
          {
            name: "common",
            value: "COMMON",
          },
          {
            name: "rare",
            value: "RARE",
          },
          {
            name: "epic",
            value: "EPIC",
          },
          {
            name: "legendary",
            value: "LEGENDARY",
          },
        ],
      },
      {
        name: "type",
        handler: (value: string) => setType(value),
        placeholder: "type",
        options: [
          {
            name: "mouth",
            value: "MOUTH",
          },
          {
            name: "hair",
            value: "HAIR",
          },
          {
            name: "front",
            value: "FRONT",
          },
          {
            name: "shirt",
            value: "SHIRT",
          },
          {
            name: "hat",
            value: "HAT",
          },
          {
            name: "back",
            value: "BACK",
          },
          {
            name: "mask",
            value: "MASK",
          },
          {
            name: "gravestone",
            value: "GRAVESTONE",
          },
          {
            name: "glasses",
            value: "GLASSES",
          },
          { name: "eyes", value: "EYES" },
          { name: "badge", value: "BADGE" },
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
    <StyledFilters
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {filterSet.selects &&
        filterSet.selects.map((select, index) => {
          const defaultOption = select.options.find(
            (option) => !!option.default
          );
          return (
            <Select
              defaultValue={defaultOption?.value}
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
                  <option key={option.value} value={option.value}>
                    {option.name}
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
    </StyledFilters>
  );
}

export { Filters };
