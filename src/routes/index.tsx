import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import "../global.css"


export default component$(() => {
  const components = [
    { name: "Buttons", path: "/buttons", description: "Variedad de botones con estilos y variantes." },
    { name: "Tag And Pill", path: "/tagPill", description: "Etiquetas con estilos y variantes." },
    { name: "Progress", path: "/progress", description: "Barras de progreso animadas y configurables." }
  ];

  return (
    <div class="container">
      <h1 class="title">Componentes UI</h1>
      <div class="grid">
        {components.map(({ name, path, description }) => (
          <Link key={name} href={path} class="card">
            <h2>{name}</h2>
            <p>{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
});
