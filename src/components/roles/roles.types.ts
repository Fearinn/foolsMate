export type Role = {
  id: string;
  team: "VILLAGE" | "WEREWOLF" | "SOLO" | "RANDOM";
  aura: "GOOD" | "EVIL" | "UNKNOWN";
  name: string;
  description: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
  advancedRoles?: string[];
  possibleRoles?: string[];
};
