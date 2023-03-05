import { useQuery } from "react-query";
import { getAvatarItems } from "../../services";
import AvatarItemCard from "./AvarItemCard";
import StyledAvatarItemList from "./StyledAvatarItemList";
import { Spinner } from "@chakra-ui/react";
import { AxiosError } from "axios";
import IAvatarItem from "../../types/AvatarItem";
import IResponseData from "../../types/ResponseData";

function AvatarItemsList() {
  const { data, isLoading, error } = useQuery<
    IResponseData<IAvatarItem>,
    AxiosError
  >(["getAvatarItems"], getAvatarItems, {
    staleTime: 1000 * 60 * 30,
    keepPreviousData: true,
  });

  if (isLoading)
    return (
      <>
        <Spinner size={"xl"} marginBottom={"1rem"} />
        <p>Data is being fetched...</p>
      </>
    );

  if (!data || error)
    return (
      <p role="alert">
        Sorry, an unexpected error has ocurred! Try again later. [Error:
        {error?.message || "unknown error"}]
      </p>
    );

  return (
    <StyledAvatarItemList>
      {data.items.map((item) => {
        return (
          <li key={item.id}>
            <AvatarItemCard {...item} />
          </li>
        );
      })}
    </StyledAvatarItemList>
  );
}

export default AvatarItemsList;
