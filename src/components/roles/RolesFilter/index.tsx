import { Button, Input, Paginator, Select } from "@/components";
import { useRolesStore } from "@/store/roles";
import { FilterSet } from "@/types/FilterSet";
import { useState } from "react";
import { Role } from "../roles.types";
import styles from "./RolesFilters.module.scss";

type Props = {
  numberOfPages: number;
};

export function RolesFilter({ numberOfPages }: Props) {
  const [isOpen, setIsOpen] = useState(false);
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
        name: "itemsPerPage",
        handler: (value: string) =>
          setFilters({ ...filters, page: 1, limit: Number(value) || 20 }),
        placeholder: "items per page",
        options: ["20", "35", "50"],
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
            filterSet.handleSubmit();
          }}
        >
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
