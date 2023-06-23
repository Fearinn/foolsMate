import { Button } from "@/components";
import { useRolesStore } from "@/store/roles";
import { FilterSet } from "@/types/FilterSet";
import { numberToList } from "@/utils/numberToList";
import { Input, Select } from "@chakra-ui/react";
import { useState } from "react";
import { Role } from "../roles.types";
import styles from "./RolesFilters.module.scss";

export function RolesFilter({ numberOfPages }: { numberOfPages: number }) {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [aura, setAura] = useState("");

  const [filters, setFilters] = useRolesStore((state) => [
    state.filters,
    state.updateFilters,
  ]);

  const filterSet: FilterSet = {
    handleSubmit: () => {
      setFilters({
        ...filters,
        page: 1,
        name: name || undefined,
        team: (team as Role["team"]) || undefined,
        aura: (aura as Role["aura"]) || undefined,
      });
    },
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
          setFilters({ ...filters, page: 1, limit: Number(value) || 20 }),
        placeholder: "items per page",
        options: ["20", "35", "50"],
        default: "20",
      },
      {
        name: "team",
        handler: (value: string) => setTeam(value),
        placeholder: "team",
        options: ["VILLAGER", "WEREWOLF", "SOLO", "RANDOM"],
      },
      {
        name: "aura",
        handler: (value: string) => setAura(value),
        placeholder: "aura",
        options: ["GOOD", "EVIL", "UNKNOWN"],
      },
    ],
    textInputs: [
      {
        name: "name",
        placeholder: "name",
        handler: (value: string) => setName(value),
      },
    ],
  };

  return (
    <form
      className={styles["roles-filters"]}
      onSubmit={(event) => {
        event.preventDefault();
        filterSet.handleSubmit();
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
      <Button type="submit">Filter</Button>
    </form>
  );
}