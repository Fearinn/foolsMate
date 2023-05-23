import { RoleIcon } from "@/components/roleIcon/types/RoleIcon";
import { Paginated } from "@/types/utils/Paginated";
import { create } from "zustand";

type AvatarItemsFilters = {
  filters: Paginated<RoleIcon>;
  updateFilters: (newFilters: Paginated<RoleIcon>) => void;
};

export const useRoleIconStore = create<AvatarItemsFilters>()((set) => ({
  filters: { page: 1, limit: 25 },
  updateFilters: (newFilters: Paginated<RoleIcon>) =>
    set(() => ({ filters: newFilters })),
}));
