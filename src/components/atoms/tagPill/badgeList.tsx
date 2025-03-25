import { component$ } from "@builder.io/qwik";
import TagPill from "./tagPill";
import type { JSX } from "@builder.io/qwik"

interface BadgeListProps {
  colors?: Array<"primary" | "secondary" | "success" | "info" | "warning" | "danger" | "light" | "dark">;
  labels?: string[];
  variant: "badge_heading" | "badge_button";
}



export const BadgeList = component$<BadgeListProps>(({ colors = [], labels = [], variant }: BadgeListProps) => {

  return (
    <div>
      {colors.slice(0, labels.length).map((color, index) => {
        switch (variant) {
            case "badge_heading": {
                const HeadingTag: keyof JSX.IntrinsicElements = `h${index + 1}`;
                return (
                  <div key={color} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <HeadingTag>{`Badge Heading ${index + 1}`}</HeadingTag>
                    <TagPill color={color} type="badge_heading" label={labels[index]} headingLevel={`h${index + 1}`} />
                  </div>
                );
              }
            case "badge_button": {
                return (
                    <div key={color} >
                      <TagPill color={color} type="badge_button" label={labels[index]} headingLevel="h3" />
                    </div>
                  );
            }
            default:
                return null;
        }
        
      })}
    </div>
  );
});