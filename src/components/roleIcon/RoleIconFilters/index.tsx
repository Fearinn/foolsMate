import { Button, Input, Select } from "@/components";
import { useRoleIconStore } from "@/store/roleIcon";
import { FilterSet } from "@/types/FilterSet";
import { handlePages } from "@/utils/handlePages";
import { numberToList } from "@/utils/numberToList";
import { Checkbox } from "@chakra-ui/react";
import { useState } from "react";
import styles from "./RoleIconFilters.module.scss";

type Props = {
  numberOfPages: number;
  onlyFavorites: boolean;
  changeOnlyFavorites: (value: boolean) => void;
};

function RoleIconFilters({
  numberOfPages,
  onlyFavorites,
  changeOnlyFavorites,
}: Props) {
  const [id, setId] = useState("");
  const [roleId, setRoleId] = useState("");
  const [event, setEvent] = useState("");
  const [filters, setFilters] = useRoleIconStore((state) => [
    state.filters,
    state.updateFilters,
  ]);

  const filterSet: FilterSet = {
    handleSubmit: () => {
      setFilters({
        ...filters,
        page: 1,
        id: id || undefined,
        event: event || undefined,
        roleId: roleId || undefined,
      });
    },
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
          setFilters({ ...filters, page: 1, limit: Number(value) || 25 }),
        placeholder: "items per page",
        options: ["25", "50", "100"],
      },
    ],
    textInputs: [
      {
        name: "id",
        placeholder: "id",
        handler: (value: string) => setId(value),
      },
      {
        name: "roleId",
        placeholder: "role",
        handler: (value: string) => setRoleId(value),
      },
      {
        name: "event",
        placeholder: "event",
        handler: (value: string) => setEvent(value),
      },
    ],
  };

  return (
    <form
      className={styles["role-icon-filters"]}
      onSubmit={(event) => {
        event.preventDefault();
        filterSet.handleSubmit();
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

export { RoleIconFilters };
