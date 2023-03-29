import { useEffect, useState } from "react";
import { IAvatarItem, IAvatarItemType } from "../../types/AvatarItem";
import { IFilters } from "../../types/Filters";
import { IRarity } from "../../types/Rarity";
import { handleGender } from "../../utils/handleGender";
import { useAvatarItems } from "../../utils/hooks/useAvatarItems";
import { numberToList } from "../../utils/numberToList";
import { ErrorMessage } from "../ErrorMessage";
import { Filters } from "../Filters";
import { Loader } from "../Loader";
import { AvatarItemCard } from "./AvarItemCard";
import { StyledAvatarItemList } from "./StyledAvatarItemList";

function AvatarItemsList() {
  const [itemsPerPage, setItemsPerPage] = useState("25");
  const [page, setPage] = useState("1");
  const [gender, setGender] = useState<string>();
  const [rarity, setRarity] = useState<string>();
  const [type, setType] = useState<string>();
  const [event, setEvent] = useState<string>();

  function handleSubmit() {
    setFilters({
      page: Number(page),
      limit: Number(itemsPerPage),
      gender: handleGender(gender),
      rarity: (rarity as IRarity) || undefined,
      type: (type as IAvatarItemType) || undefined,
      event: event || undefined,
    });
  }

  function pageHandler(value: string) {
    setPage(value);
  }

  function itemsPerPageHandler(value: string) {
    setItemsPerPage(value);
  }

  function genderHandler(value: string) {
    setGender(value);
  }

  function rarityHandler(value: string) {
    setRarity(value);
  }

  function typeHandler(value: string) {
    setType(value);
  }

  function eventHandler(value: string) {
    setEvent(value);
  }

  const [filters, setFilters] = useState<
    Partial<{ page: number; limit: number } & IAvatarItem>
  >({});

  const { data, isLoading, error } = useAvatarItems(filters);

  const [numberOfPages, setNumberOfPages] = useState(0);

  const filterSet: IFilters = {
    handleSubmit,
    selects: [
      {
        name: "page",
        handler: pageHandler,
        placeholder: "page",
        options: numberToList(numberOfPages).map((number) => {
          return {
            name: number.toString(),
            value: number,
          };
        }),
      },
      {
        name: "itemsPerPage",
        handler: itemsPerPageHandler,
        placeholder: "items per page",
        options: [
          {
            name: "25",
            value: 25,
            default: true,
          },
          {
            name: "50",
            value: 50,
          },
          {
            name: "100",
            value: 100,
          },
          {
            name: "200",
            value: 200,
          },
        ],
      },
      {
        name: "gender",
        handler: genderHandler,
        placeholder: "gender",
        options: [
          {
            name: "both",
            value: "BOTH",
          },
          {
            name: "male",
            value: "MALE",
          },
          {
            name: "female",
            value: "FEMALE",
          },
        ],
      },
      {
        name: "rarity",
        handler: rarityHandler,
        placeholder: "rarity",
        options: [
          {
            name: "common",
            value: "COMMON",
          },
          {
            name: "rare",
            value: "RARE",
          },
          {
            name: "epic",
            value: "EPIC",
          },
          {
            name: "legendary",
            value: "LEGENDARY",
          },
        ],
      },
      {
        name: "type",
        handler: typeHandler,
        placeholder: "type",
        options: [
          {
            name: "mouth",
            value: "MOUTH",
          },
          {
            name: "hair",
            value: "HAIR",
          },
          {
            name: "front",
            value: "FRONT",
          },
          {
            name: "shirt",
            value: "SHIRT",
          },
          {
            name: "hat",
            value: "HAT",
          },
          {
            name: "back",
            value: "BACK",
          },
          {
            name: "mask",
            value: "MASK",
          },
          {
            name: "gravestone",
            value: "GRAVESTONE",
          },
          {
            name: "glasses",
            value: "GLASSES",
          },
        ],
      },
    ],
    textInputs: [
      {
        name: "event",
        handler: eventHandler,
        placeholder: "event",
      },
    ],
  };

  useEffect(() => {
    setNumberOfPages(
      Math.ceil(Number(data?.totalCount) / Number(itemsPerPage)) || 1
    );
  }, [data, itemsPerPage]);

  if (isLoading)
    return (
      <>
        <Loader />
      </>
    );

  if (!data || error) {
    return <ErrorMessage />;
  }

  return (
    <StyledAvatarItemList>
      <Filters {...filterSet} />
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
          <p role="alert">No item was found with the selected filters!</p>
        )}
      </ul>
    </StyledAvatarItemList>
  );
}

export { AvatarItemsList };
