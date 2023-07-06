import { AvatarItem } from "@/components/avatarItem/avatarItems.types";
import { Paginated } from "@/types/utils/Paginated";
import { create } from "zustand";

type AvatarItemsFilters = {
  filters: Paginated<AvatarItem> & { idList?: string };
  updateFilters: (
    newFilters: Paginated<AvatarItem> & { idList?: string }
  ) => void;
};

export const useAvatarItemStore = create<AvatarItemsFilters>()((set) => ({
  filters: { page: 1, limit: 100 },
  updateFilters: (newFilters: Paginated<AvatarItem>) =>
    set(() => ({ filters: newFilters })),
}));
