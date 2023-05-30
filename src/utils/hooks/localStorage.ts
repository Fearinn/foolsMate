import { useEffect, useState } from "react";

export function useLocalStorage(key: string) {
  const [stored, setStored] = useState("");

  function setter(item: string) {
    setStored(item);
    localStorage.setItem(key, item);
  }

  useEffect(() => {
    const item = localStorage.getItem(key);
    setStored(item ?? "");
  }, [key]);

  return [stored, setter] as const;
}
