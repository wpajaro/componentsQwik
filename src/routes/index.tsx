import { component$ } from "@builder.io/qwik";
import { Card } from "~/components/molecules/Card/Card";
import { components } from '~/providers/components';
import styles from "~/components/molecules/Card/card.module.css";

export default component$(() => {
  return (
    <div class="container">
      <Card.Group> 
        {components.map(({ name, path }) => (
          <Card key={name} bordered shaded hoverLift>
            <a href={path} class={styles.cardLink}>
              <Card.Body>
                <h5>{name}</h5>
              </Card.Body>
            </a>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
});