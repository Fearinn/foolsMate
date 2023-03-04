import { useQuery } from "react-query";
import { getAvatarItems } from "../../services";
import AvatarItemCard from "./AvarItemCard";
import StyledAvatarItemList from "./StyledAvatarItemList";

function AvatarItemsList() {
  const { data, error } = useQuery(["getAvatarItems"], getAvatarItems, {
    staleTime: 1000 * 60 * 30,
    keepPreviousData: true
  });

  if (!data || error) return <></>;

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
