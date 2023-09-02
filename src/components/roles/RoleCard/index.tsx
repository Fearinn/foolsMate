import { Button } from "@/components/Button";
import { Heading } from "@chakra-ui/react";
import { useState } from "react";
import { Role } from "../roles.types";
import styles from "./RoleCard.module.scss";

type Props = {
  index: number;
} & Role;

export function RoleCard({
  id,
  image,
  name,
  description,
  aura,
  team,
  advancedRoles,
  index,
}: Props) {
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  return (
    <div className={styles["role-card"]}>
      <img
        decoding={index > 9 ? "async" : undefined}
        loading={index > 9 ? "lazy" : "eager"}
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
            aria-controls={`${id}-description`}
            aria-expanded={descriptionOpen}
            type="button"
            onClick={() => setDescriptionOpen(!descriptionOpen)}
          >
            {descriptionOpen ? "Hide description" : "Read description"}
          </Button>
          {advancedRoles && (
            <Button
              aria-controls={`${id}-advanced-roles`}
              aria-expanded={advancedOpen}
              type="button"
              onClick={() => setAdvancedOpen(!advancedOpen)}
            >
              {advancedOpen ? "Hide advanceds" : "Show advanceds"}
            </Button>
          )}
        </div>
        <p
          id={`${id}-description`}
          aria-live="polite"
          className={styles.description}
        >
          {descriptionOpen ? description : <></>}
        </p>
        <ul
          id={`${id}-advanced-roles`}
          aria-live="polite"
          className={styles.advanceds}
        >
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
