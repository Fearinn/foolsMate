import { Button, Input, Paginator, Select } from "@/components";
import { useRoleIconStore } from "@/store/roleIcon";
import { FilterSet } from "@/types/FilterSet";
import { Checkbox, useColorMode } from "@chakra-ui/react";
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
  const { colorMode } = useColorMode();

  const [isOpen, setIsOpen] = useState(false);

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
    <>
      <Button
        type="button"
        aria-controls="filters-form"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close filters" : "Open filters"}
      </Button>
      <div className={styles["controlled-region"]}>
        <form
          id="filters-form"
          className={styles["filters"]}
          onSubmit={(event) => {
            event.preventDefault();
            filterSet.handleSubmit();
          }}
        >
          <Checkbox
            colorScheme={colorMode === "light" ? "pink" : "purple"}
            justifyContent={isOpen ? "center" : "flex-start"}
            size="lg"
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

export { RoleIconFilters };

