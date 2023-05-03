import { StyledRewardCard } from "./StyledRewardCard";

function RewardCard({ imageUrl }: { imageUrl: string }) {
  return (
    <StyledRewardCard>
        <img src={imageUrl} alt="" role="presentation"/>
    </StyledRewardCard>
  );
}

export { RewardCard };
