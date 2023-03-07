import { useQuery } from "react-query";
import { getAvatarItems } from "../../services";
import AvatarItemCard from "./AvarItemCard";
import StyledAvatarItemList from "./StyledAvatarItemList";
import { Button, Input, Select, Spinner } from "@chakra-ui/react";
import { AxiosError } from "axios";
import IAvatarItem, {
  IAvatarItemGender,
  IAvatarItemType,
  IAvatarItemRarity,
} from "../../types/AvatarItem";
import IResponseData from "../../types/ResponseData";
import { useEffect, useState } from "react";
import { colors } from "../../assets/cssVariables";

function AvatarItemsList() {
  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(1);
  const [gender, setGender] = useState<string>();
  const [rarity, setRarity] = useState<string>();
  const [type, setType] = useState<string>();
  const [event, setEvent] = useState<string>();

  function handleGender(gender: string | undefined) {
    if (gender === "BOTH") return "";
    if (gender === "") return undefined;
    return gender as IAvatarItemGender;
  }

  const [filters, setFilters] = useState<Partial<IAvatarItem>>({});

  function pageOptions() {
    const numberList: number[] = [];
    for (let i = 1; i <= (numberOfPages || 0); i++) {
      numberList.push(i);
    }
    return numberList;
  }

  const { data, isLoading, error, refetch } = useQuery<
    IResponseData<IAvatarItem>,
    AxiosError
  >(["getAvatarItems", filters], () => getAvatarItems(limit, page, filters), {
    staleTime: 1000 * 60 * 30,
    keepPreviousData: true,
  });

  const [numberOfPages, setNumberOfPages] = useState(data?.numberOfPages);

  useEffect(() => {
    if (!isLoading) refetch();
  }, [filters]);

  useEffect(() => {
    setNumberOfPages(Math.ceil(Number(data?.totalCount) / limit) || 1);
  }, [limit]);

  if (isLoading)
    return (
      <>
        <Spinner size={"xl"} marginBottom={"1rem"} />
        <p>Data is being fetched...</p>
      </>
    );

  if (!data || error) {
    return (
      <p role="alert">
        Sorry, an unexpected error has ocurred! Try again later. [Error:
        {error?.message || "unknown error"}]
      </p>
    );
  }

  return (
    <StyledAvatarItemList>
      <div className="filters">
        <Select
          placeholder="Items Per Page"
          width="auto"
          variant="filled"
          onChange={(event) => {
            setLimit(Number(event.target.value) || 100);
          }}
        >
          <option value={100}>100 (default)</option>
          <option value={500}>500</option>
          <option value={1000}>1000</option>
        </Select>
        <Select
          placeholder="Gender"
          width="auto"
          variant="filled"
          onChange={(event) => {
            setGender(event.target.value);
          }}
        >
          <option value={"BOTH"}>Both</option>
          <option value={"MALE"}>Male</option>
          <option value={"FEMALE"}>Female</option>
        </Select>
        <Select
          placeholder="Rarity"
          width="auto"
          variant="filled"
          onChange={(event) => {
            setRarity(event.target.value);
          }}
        >
          <option value={"COMMON"}>Common</option>
          <option value={"RARE"}>Rare</option>
          <option value={"EPIC"}>Epic</option>
          <option value={"LEGENDARY"}>Legendary</option>
        </Select>
        <Select
          placeholder="Type"
          width="auto"
          variant="filled"
          onChange={(event) => {
            setType(event.target.value);
          }}
        >
          <option value={"HAIR"}>Hair</option>
          <option value={"FRONT"}>Front</option>
          <option value={"SHIRT"}>Shirt</option>
          <option value={"HAT"}>Hat</option>
          <option value={"GLASSES"}>Glasses</option>
          <option value={"MOUTH"}>Mouth</option>
          <option value={"GRAVESTONE"}>Gravestone</option>
          <option value={"BACK"}>Back</option>
          <option value={"MASK"}>Mask</option>
        </Select>
        <Select
          placeholder="Page"
          width="auto"
          variant="filled"
          onChange={(event) => {
            setPage(Number(event.target.value) || 1);
          }}
        >
          {pageOptions().map((number) => {
            return (
              <option key={number} value={number}>
                {number}
              </option>
            );
          })}
        </Select>
        <Input
          width="auto"
          size="md"
          type="text"
          variant="filled"
          placeholder="Event"
          onBlur={(event) => setEvent(event.target.value)}
        />
        <Button
          backgroundColor={colors.mainBrand}
          _hover={{ background: colors.mainBrand, opacity: 0.8 }}
          color={colors.secondaryFont}
          onClick={() => {
            setFilters({
              gender: handleGender(gender),
              rarity: (rarity as IAvatarItemRarity) || undefined,
              type: (type as IAvatarItemType) || undefined,
              event: event || undefined,
            });
          }}
        >
          Filter
        </Button>
      </div>
      <ul>
        {data.items.map((item) => {
          return (
            <li key={item.id}>
              <AvatarItemCard {...item} />
            </li>
          );
        })}
      </ul>
    </StyledAvatarItemList>
  );
}

export default AvatarItemsList;
