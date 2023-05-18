import { IAvatarItem } from "@/components/avatarItem/types/AvatarItem";
import { Paginated } from "@/types/utils/Paginated";
import { create } from "zustand";

type AvatarItemsFilters = {
  filters: Paginated<IAvatarItem>;
  updateFilters: (newFilters: Paginated<IAvatarItem>) => void;
};

export const useAvatarItemStore = create<AvatarItemsFilters>()((set) => ({
  filters: { page: 1, limit: 100 },
  updateFilters: (newFilters: Paginated<IAvatarItem>) =>
    set(() => ({ filters: newFilters })),
}));
