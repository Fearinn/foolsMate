import { Role } from "@/components/roles/roles.types";

export type RotationResponse = {
  gameMode:
    | "quick"
    | "sandbox"
    | "advanced"
    | "ranked-league-silver"
    | "ranked-league-gold"
    | "crazy-fun";
  roleRotations: {
    id: string;
    roles: string[];
  }[];
}[];

export type Info = {
  unconfirmed: Record<number, string>[];
  real: Record<number, string>[];
  fake: Record<number, string>[];
};
