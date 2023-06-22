import { Role } from "@/components/roles/roles.types";
import { Paginated } from "@/types/utils/Paginated";
import { create } from "zustand";

type RolesFilters = {
  filters: Paginated<Role>;
  updateFilters: (newFilters: Paginated<Role>) => void;
};

export const useRolesStore = create<RolesFilters>()((set) => ({
  filters: { page: 1, limit: 20 },
  updateFilters: (newFilters: Paginated<Role>) =>
    set(() => ({ filters: newFilters })),
}));
