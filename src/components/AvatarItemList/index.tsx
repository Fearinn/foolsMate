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
  const [itemsPerPage, setItemsPerPage] = useState("100");
  const [page, setPage] = useState("1");
  const [gender, setGender] = useState("");
  const [rarity, setRarity] = useState("");
  const [type, setType] = useState("");
  const [event, setEvent] = useState("");
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [filters, setFilters] = useState<
    Partial<{ page: number; limit: number } & IAvatarItem>
  >({ limit: 100, page: 1 });

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

  const { data, isLoading, error } = useAvatarItems(filters);

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
            name: "100",
            value: 100,
            default: true,
          },
          {
            name: "200",
            value: 200,
          },
          { name: "500", value: 500 },
          {
            name: "1000",
            value: 1000,
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
          { name: "eyes", value: "EYES" },
          { name: "badge", value: "BADGE" },
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
    const totalCount = Number(data?.totalCount);
    const pageCount = Number(itemsPerPage);
    if (totalCount && pageCount) {
      setNumberOfPages(Math.ceil(totalCount / pageCount));
    } else {
      setNumberOfPages(1);
    }
  }, [data, itemsPerPage]);

  if (isLoading) return <Loader />;

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
          <ErrorMessage>
            No item was found with the selected filters!
          </ErrorMessage>
        )}
      </ul>
    </StyledAvatarItemList>
  );
}

export { AvatarItemsList };

