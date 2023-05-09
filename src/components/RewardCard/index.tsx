import Image from "next/image";
import { StyledRewardCard } from "./StyledRewardCard";

function RewardCard({ imageUrl }: { imageUrl: string }) {
  return (
    <StyledRewardCard>
      <Image
        src={imageUrl}
        alt=""
        role="presentation"
        width={100}
        height={50}
      />
    </StyledRewardCard>
  );
}

export { RewardCard };

