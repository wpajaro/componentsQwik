import { component$ } from "@builder.io/qwik";
import Login from "~/components/organisms/login/login"; // Se actualizó el nombre del componente

export default component$(() => {
  return (
    <div class="page-container">
      <Login />
    </div>
  );
});

