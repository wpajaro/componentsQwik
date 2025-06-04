import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Button from "@/components/atoms/Button/Button";

export default component$(() => {
  const colors = ["primary", "secondary", "success", "info", "warning", "danger", "light"];
  const isDisabled = useSignal(false);
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <>

      <h2>Default Buttons</h2>
      <div>
        {colors.map((color) => (
          <Button 
            key={color} 
            color={color as any} 
            type="fill" 
            variant="default" 
            fullWidth={false} 
            appearance="clasico"
            label={`${capitalize(color)} Button`}/>
        ))}
      </div>

      <h2>Large Buttons</h2>
      <div>
        {colors.map((color) => (
          <Button 
            key={color} 
            color={color as any} 
            variant="large" 
            label={`${capitalize(color)} Button`}/>
        ))}
      </div>

      <h2>Small Buttons</h2>
      <div>
        {colors.map((color) => (
          <Button 
            key={color} 
            color={color as any} 
            variant="small" 
            label={`${capitalize(color)} Button`}/>
        ))}
      </div>

      <h2>Extra Small Buttons</h2>
      <div>
        {colors.map((color) => (
          <Button 
            key={color} 
            color={color as any} 
            variant="extra-small" 
            label={`${capitalize(color)} Button`}/>
        ))}
      </div>

      <h2>Active Buttons</h2>
      <div>
        {colors.map((color) => (
          <Button 
          key={color} 
          label={"Active"} 
          color={color as any} 
          variant="default"
          disabled={isDisabled.value}
          />
        ))}
      </div>

      <h2>Disabled Buttons</h2>
      <div>
        {colors.map((color) => (
          <Button 
          key={color} 
          label={"Disabled"} 
          color={color as any} 
          variant="default"
          disabled={!isDisabled.value}
          />
        ))}
      </div>

      <h2>Outline Buttons</h2>
      <div>
        {colors.map((color) => (
          <Button 
            key={color} 
            color={color as any} 
            type="outline" 
            variant="default"
            label={`${capitalize(color)} Button`}/>
        ))}
      </div>

      <h2>Bold Border Outline Buttons</h2>
      <div>
        {colors.map((color) => (
          <Button 
            key={color} 
            color={color as any} 
            type="outline" 
            variant="bold-border"
            label={`${capitalize(color)} Button`}/>
        ))}
      </div>

      <h2>Outline Large Buttons</h2>
      <div>
        {colors.map((color) => (
          <Button 
            key={color} 
            color={color as any} 
            type="outline" 
            variant="large"
            label={`${capitalize(color)} Button`}/>
        ))}
      </div>

      <h2>Outline Large Buttons</h2>
      <div>
        {colors.map((color) => (
          <Button 
            key={color} 
            color={color as any} 
            type="outline" 
            variant="large"
            label={`${capitalize(color)} Button`}/>
        ))}
      </div>

      <h2>Outline Small Buttons</h2>
      <div>
        {colors.map((color) => (
          <Button 
            key={color} 
            color={color as any} 
            type="outline" 
            variant="small"
            label={`${capitalize(color)} Button`}/>
        ))}
      </div>

      <h2>Outline Extra-Small Buttons</h2>
      <div>
        {colors.map((color) => (
          <Button 
            key={color} 
            color={color as any} 
            type="outline" 
            variant="extra-small"
            label={`${capitalize(color)} Button`}/>
        ))}
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