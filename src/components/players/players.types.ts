export type Avatar = {
  url: string;
  width: number;
  height: number;
};

export type GameStats = {
  totalWinCount: number;
  totalLoseCount: number;
  totalTieCount: number;
  villageWinCount: number;
  villageLoseCount: number;
  werewolfWinCount: number;
  werewolfLoseCount: number;
  votingWinCount: number;
  votingLoseCount: number;
  soloWinCount: number;
  soloLoseCount: number;
  exitGameBySuicideCount: number;
  exitGameAfterDeathCount: number;
  gamesSurvivedCount: number;
  gamesKilledCount: number;
  totalPlayTimeInMinutes: number;
};

export type Player = {
  id: string;
  username: string;
  level: number;
  creationTime?: string;
  clanId?: string;
  rankedSeasonSkill?: number;
  rankedSeasonMaxSkill?: number;
  rankedSeasonBestRank?: number;
  rankedSeasonPlayedCount?: number;
  equippedAvatar: Avatar;
  avatars?: Avatar[];
  gameStats?: GameStats;
};
