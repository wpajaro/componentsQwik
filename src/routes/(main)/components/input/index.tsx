import { component$, useSignal, $ } from "@builder.io/qwik";
import Input from "@/components/atoms/Input/Input";

export default component$(() => {
  const text = useSignal("");
  const email = useSignal("");
  const password = useSignal("");
  const number = useSignal("");
  const date = useSignal("");
  const url = useSignal("");
  const select = useSignal("");
  const fileName = useSignal("");

  const handleFileChange = $((val: string) => {
    fileName.value = val.split("\\").pop() || "Archivo seleccionado";
  });

  return (
    <div class="container mt-4">
      <h2 class="mb-3">Demo Inputs</h2>

      <Input
        label="Texto"
        type="text"
        placeholder="Ingrese texto"
        value={text.value}
        onChange$={(val) => (text.value = val)}
        height="55"
        radius={'0'}
      />

      <Input
        label="Email"
        type="email"
        placeholder="Ingrese correo electrónico"
        value={email.value}
        onChange$={(val) => (email.value = val)}
        height="55"
        radius={'0'}
      />

      <Input
        label="Contraseña"
        type="password"
        placeholder="Ingrese contraseña"
        value={password.value}
        onChange$={(val) => (password.value = val)}
        height="55"
        radius={'0'}
      />

      <Input
        label="Número"
        type="number"
        placeholder="Ingrese un número"
        value={number.value}
        onChange$={(val) => (number.value = val)}
        height="55"
        radius={'0'}
      />

      <Input
        label="Fecha"
        type="date"
        value={date.value}
        onChange$={(val) => (date.value = val)}
        height="55"
        radius={'0'}
      />

      <Input
        label="URL"
        type="url"
        placeholder="https://ejemplo.com"
        value={url.value}
        onChange$={(val) => (url.value = val)}
        height="55"
        radius={'0'}
      />

      <Input
        label="Seleccionar opción"
        type="select"
        options={["Opción 1", "Opción 2", "Opción 3"]}
        value={select.value}
        onChange$={(val) => (select.value = val)}
        height="55"
        radius={'0'}
      />

      <Input
        label="Adjuntar archivo"
        type="file"
        onChange$={handleFileChange}
        height="55"
        radius={'0'}
      />

      {fileName.value && (
        <p class="mt-2 text-primary">Archivo seleccionado: {fileName.value}</p>
      )}
    </div>
  );
});
