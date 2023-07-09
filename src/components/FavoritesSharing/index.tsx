import { useEffect, useState } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import styles from "./FavoritesSharing.module.scss";
import { BiImport, BiExport, BiCheck } from "react-icons/bi";
import { colors } from "@/assets/cssVariables";

const iconStyles = {
  className: styles.icon,
  color: colors.fontMain,
  size: 20,
};

type Props = {
  favorites: string;
  changeFavorites: (value: string) => void;
  maxFavoritesLength: number;
};

export function FavoritesSharing({
  favorites,
  changeFavorites,
  maxFavoritesLength,
}: Props) {
  const [copied, setCopied] = useState(false);

  const [newFavorites, setNewFavorites] = useState("");

  function clearCopied() {
    setCopied(false);
  }

  useEffect(() => {
    if (copied) {
      const timeoutId = setTimeout(clearCopied, 10000);

      return () => clearTimeout(timeoutId);
    }
  }, [copied]);

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();
          confirm(
            "Importing favorites will override your current favorites. Are you sure?"
          );
          const safeNewFavorites = newFavorites.replaceAll("script", "");
          changeFavorites(safeNewFavorites);
        }}
      >
        <Input
          required
          minLength={3}
          maxLength={maxFavoritesLength}
          placeholder="Paste exported favorites"
          onChange={(event) => setNewFavorites(event.target.value)}
          value={newFavorites}
        ></Input>
        <Button type="submit">
          Import favorites <BiImport {...iconStyles} />
        </Button>
      </form>
      <Button
        type="button"
        aria-live="polite"
        disabled={copied}
        onClick={() => {
          navigator.clipboard.writeText(favorites);
          setCopied(true);
        }}
      >
        {copied ? (
          <>
            Copied to clipboard <BiCheck {...iconStyles} />
          </>
        ) : (
          <>
            Export favorites <BiExport {...iconStyles} />
          </>
        )}
      </Button>
    </div>
  );
}
