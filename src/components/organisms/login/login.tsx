import { component$, useSignal, useOnWindow, $ } from "@builder.io/qwik";
import styles from "./login.module.css";
import { Image } from "@unpic/qwik";
import Button from "~/components/atoms/Button/Button";

export default component$(() => {
  const esMovil = useSignal(false);

  useOnWindow("resize", $(() => {
    esMovil.value = window.innerWidth < 768;
  }));

  return (
    <div class={styles.overlay}>
      <div class={`${styles.container} container-fluid`}>
        {/* Muestra la imagen correspondiente según esMovil.value */}
        {!esMovil.value ? (
          <div class={`${styles.logoContainer} text-center`}>
            <Image
              src="/images/logo.png"
              alt="Sistema Único Distrital"
              width={173}
              height={336}
              class="img-fluid"
            />
          </div>
        ) : (
          <div class={`${styles.logoContainer} text-center`}>
            <Image
              src="/images/logoHorizontal.png"
              alt="Sistema Único Distrital"
              width={100}
              height={51}
              class="img-fluid"
            />
          </div>
        )}

        <div class={`${styles.loginContainer} card m-4`}>
          <Image
            src="/images/logoAlcaldia.svg"
            alt="Alcaldía de Cartagena"
            width={106}
            height={106}
            class="img-fluid mx-auto d-block mb-4"
          />
          <h2 class="card-title text-center mb-3">Iniciar Sesión</h2>
          <p class="card-text custom-text-color mb-4">
            Ingresa tus datos de usuario.
          </p>
          <form>
            <div class={`${styles.inputGroup} form-floating mb-4`}>
              <input type="text" id="usuario" placeholder="Identificación" class="form-control" />
              <label for="usuario">Usuario</label>
            </div>
            <div class={`${styles.inputGroup} form-floating mb-4`}>
              <input type="password" id="password" placeholder="Ingresa una contraseña" class="form-control" />
              <label for="password">Contraseña</label>
            </div>
            <div class="d-grid gap-2 mb-3">
              <Button type="fill" variant="large" label="Iniciar Sesión"></Button>
            </div>
            <a href="#" class={`${styles.olvidarPassword} d-block text-center text-decoration-none`}>
              ¿Olvidaste tu contraseña?
            </a>
          </form>
        </div>
      </div>
    </div>
  );
});