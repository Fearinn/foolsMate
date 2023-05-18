import { IRoleIcon } from "@/components/roleIcon/types/RoleIcon";
import { Paginated } from "@/types/utils/Paginated";
import { create } from "zustand";

type AvatarItemsFilters = {
  filters: Paginated<IRoleIcon>;
  updateFilters: (newFilters: Paginated<IRoleIcon>) => void;
};

export const useRoleIconStore = create<AvatarItemsFilters>()((set) => ({
  filters: { page: 1, limit: 25 },
  updateFilters: (newFilters: Paginated<IRoleIcon>) =>
    set(() => ({ filters: newFilters })),
}));
