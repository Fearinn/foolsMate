import Image from "next/image";
import { Role } from "../roles.types";
import { Button } from "@/components/Button";
import { Heading } from "@chakra-ui/react";
import { useState } from "react";
import styles from "./RoleCard.module.scss";
import { useRolesStore } from "@/store/roles";

export function RoleCard({
  image,
  name,
  description,
  aura,
  team,
  advancedRoles,
}: Role) {
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  return (
    <div className={styles["role-card"]}>
      <Image
        role="presentation"
        alt=""
        src={image.url}
        height={image.height / 2}
        width={image.width / 2}
      />
      <div className={styles.text}>
        <Heading textAlign="center" size="md">
          {name}
        </Heading>
        <p>
          Team: <span className={styles[team]}>{team}</span>
        </p>
        <p>
          Aura: <span className={styles[aura]}>{aura}</span>
        </p>
        <div className={styles.buttons}>
          <Button
            aria-controls="role-description"
            aria-expanded={descriptionOpen}
            type="button"
            onClick={() => setDescriptionOpen(!descriptionOpen)}
          >
            {descriptionOpen ? "Hide description" : "Read description"}
          </Button>
          {advancedRoles && (
            <Button
              aria-controls="advanced-roles"
              aria-expanded={advancedOpen}
              type="button"
              onClick={() => setAdvancedOpen(!advancedOpen)}
            >
              {advancedOpen ? "Hide advanceds" : "Show advanceds"}
            </Button>
          )}
        </div>
        <p
          id="role-description"
          aria-live="polite"
          className={styles.description}
        >
          {descriptionOpen ? description : <></>}
        </p>
        <ul id="advanced-roles" aria-live="polite" className={styles.advanceds}>
          {advancedOpen && advancedRoles ? (
            advancedRoles.map((role, index) => {
              return <li key={index}>{role}</li>;
            })
          ) : (
            <></>
          )}
        </ul>
      </div>
    </div>
  );
}
