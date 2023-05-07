import {
  AvatarItemCard,
  AvatarItemsFilters,
  ErrorMessage,
  Loader,
} from "@/components";
import { useStore } from "@/store/filters";
import { useAvatarItems } from "@/utils/hooks/useAvatarItems";
import { useEffect, useState } from "react";
import { StyledAvatarItemList } from "./StyledAvatarItemList";

function AvatarItems() {
  const filters = useStore((state) => state.filters);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const itemsPerPage = useStore((state) => state.filters.limit);

  const { data, isLoading, error } = useAvatarItems(filters);

  useEffect(() => {
    const totalCount = Number(data?.totalCount);
    const pageCount = Number(itemsPerPage);
    if (totalCount && pageCount) {
      setNumberOfPages(Math.ceil(totalCount / pageCount));
    } else {
      setNumberOfPages(1);
    }
  }, [data, itemsPerPage]);

  if (isLoading)
    return (
      <main>
        <Loader />
      </main>
    );

  if (!data || error) {
    return (
      <main>
        <ErrorMessage />
      </main>
    );
  }

  return (
    <main>
      <StyledAvatarItemList>
        <AvatarItemsFilters numberOfPages={numberOfPages} />
        <div className="stats">
          <p>
            Results in this page: <span>{data.count}</span>
          </p>
          <p>
            Current page: <span>{data.currentPage}</span>
          </p>
          <p>
            Total of results: <span>{data.totalCount}</span>
          </p>
        </div>
        <ul>
          {data.items.length ? (
            data.items.map((item) => {
              return (
                <li key={item.id}>
                  <AvatarItemCard {...item} />
                </li>
              );
            })
          ) : (
            <ErrorMessage>
              No item was found with the selected filters!
            </ErrorMessage>
          )}
        </ul>
      </StyledAvatarItemList>
    </main>
  );
}

export default AvatarItems;
