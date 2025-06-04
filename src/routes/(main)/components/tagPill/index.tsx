import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import TagPill from "@/components/atoms/TagPill/TagPill";
import type { JSX } from "@builder.io/qwik"
import { BadgeList } from "@/components/atoms/TagPill/BadgeList";


export default component$(() => {
  const colors = ["primary", "secondary", "success", "info", "warning", "danger", "light", "dark"] as const;
  const labels = ["Latest", "Trending", "Checkout", "Inbox", "Login", "Logout"];
  const labelsBadgeButtons = ["Mensajes", "Notificaciones", "Actualización Disponible", "Reproduciendo", "1.2 GB Usados"];

  return (
    <>

      <h2>Badges Contextual Variations</h2>
      <div>
        {colors.map((color) => (
          <TagPill key={color} color={color as any} type="contextual" label={color.charAt(0).toUpperCase() + color.slice(1)}/>
        ))}
      </div>

      <h2>Pills Contextual Variations</h2>
      <div>
        {colors.map((color) => (
          <TagPill key={color} color={color as any} type="pill" label={color.charAt(0).toUpperCase() + color.slice(1)}/>
        ))}
      </div>

      <h2>Number of Badge</h2>
      <div>
        {colors.map((color, index) => (
          <TagPill key={color} color={color as any} type="number_badge" label={(index + 1).toString()}/>
        ))}
      </div>

      <h2>Number of Pills Tags</h2>
      <div>
        {colors.map((color, index) => (
          <TagPill key={color} color={color as any} type="number-pill" label={(index + 1).toString()}/>
        ))}
      </div>

      <h2>Badge Tags With Icons</h2>
      <div>
        {colors.map((color) => (
          <TagPill key={color} color={color as any} type="badge_icons" />
        ))}
      </div>

      <h2>Rounded Pills With Icons</h2>
      <div>
        {colors.map((color) => (
          <TagPill key={color} color={color as any} type="pill_icons" />
        ))}
      </div>

      <h2>Badge Headings Example</h2>
      <div>
        {colors.slice(0, labels.length).map((color, index) => {
          const HeadingTag: keyof JSX.IntrinsicElements = `h${index + 1}`;

          return (
            <div key={color} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <HeadingTag>{`Badge Heading ${index + 1}`}</HeadingTag>
              <TagPill color={color as any} type="badge_heading" label={labels[index]} headingLevel={`h${index + 1}`}/>
            </div>
          );
        })}
      </div>

      <h2>Badge Buttons Example</h2>
      <div>
        <BadgeList colors={colors.slice(0, labelsBadgeButtons.length)} 
        variant="badge_button" 
        labels={labelsBadgeButtons} />
      </div>
      
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};