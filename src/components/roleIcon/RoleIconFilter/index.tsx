import { colors } from "@/assets/cssVariables";
import { StyledAvatarItemFilters } from "@/components/avatarItem/AvatarItemsFilter/StyledAvatarItemFilters";
import { useRoleIconStore } from "@/store/roleIcon";
import { IFilterSet } from "@/types/FilterSet";
import { numberToList } from "@/utils/numberToList";
import { Button, Input, Select } from "@chakra-ui/react";
import { useState } from "react";

function RoleIconFilter({ numberOfPages }: { numberOfPages: number }) {
  const [roleId, setRoleId] = useState("");
  const [event, setEvent] = useState("");
  const [filters, setFilters] = useRoleIconStore((state) => [
    state.filters,
    state.updateFilters,
  ]);

  const filterSet: IFilterSet = {
    handleSubmit: () => {
      setFilters({
        ...filters,
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
        options: numberToList(numberOfPages).map((number) => number.toString()),
      },
      {
        name: "itemsPerPage",
        handler: (value: string) =>
          setFilters({ ...filters, limit: Number(value) || 25 }),
        placeholder: "items per page",
        options: ["25", "50", "100"],
        default: "25",
      },
    ],
    textInputs: [
      {
        name: "event",
        placeholder: "event",
        handler: (value: string) => setEvent(value),
      },
      {
        name: "roleId",
        placeholder: "role",
        handler: (value: string) => setRoleId(value),
      },
    ],
  };

  return (
    <StyledAvatarItemFilters
      onSubmit={(e) => {
        e.preventDefault();
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

export { RoleIconFilter };
