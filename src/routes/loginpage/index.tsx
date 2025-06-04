import { component$, $, useSignal, useStore } from "@builder.io/qwik";
import { LoginContainer } from "@/components/organisms/Login/LoginContainer";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import { loginServices } from "@/services/auth/handleLogin";
import { useNavigate } from "@builder.io/qwik-city";

export default component$(() => {
  const form = useStore({ username: "", password: "" });
  const errorMessage = useSignal("");
  const successMessage = useSignal("");
  const isLoading = useSignal(false);
  const navigate = useNavigate();

  const handleSubmit = $(async () => {
    isLoading.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    const result = await loginServices(form.username, form.password);
    isLoading.value = false;

    if (result.success) {
      localStorage.setItem("accessToken", result.data.accessToken);
      localStorage.setItem("refreshToken", result.data.refreshToken);
      successMessage.value = result.message || "Inicio de sesión exitoso ✅";
      
      setTimeout(() => {
        navigate("/buttons");
      }, 1500);
    } else {
      errorMessage.value = result.message || "Error al iniciar sesión ❌";
    }
  });

  return (
    <LoginContainer
      verticalLogoSrc="/images/logo.png"
      horizontalLogoSrc="/images/logoHorizontal.png"
      logoSrc="/images/logoAlcaldia.svg"
      title="Iniciar Sesión"
      subtitle="Ingresa tus datos de usuario"
      onSubmit$={handleSubmit}
    >
      <Input
        id="usuario"
        placeholder="Identificación"
        label="Usuario"
        type="text"
        value={form.username}
        onChange$={(value) => (form.username = value)}
        height="55px"
        radius="0px"
      />
      <Input
        id="password"
        placeholder="Ingresa una contraseña"
        label="Contraseña"
        type="password"
        value={form.password}
        onChange$={(value) => (form.password = value)}
        height="55px"
        radius="0px"
      />
      <div class="d-grid gap-2 mb-3">
        <Button
          type="fill"
          variant="large"
          label={isLoading.value ? "Cargando..." : "Iniciar Sesión"}
          disabled={isLoading.value}
          onClick$={handleSubmit}
        />
      </div>

      {errorMessage.value && (
        <p class="text-danger text-center">{errorMessage.value}</p>
      )}

      {successMessage.value && (
        <p class="text-success text-center">{successMessage.value}</p>
      )}

      <a href="#">
        ¿Olvidaste tu contraseña?
      </a>
    </LoginContainer>
  );
});