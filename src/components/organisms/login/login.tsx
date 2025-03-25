import { component$ } from "@builder.io/qwik";
import styles from "./login.module.css"
import { Image } from "@unpic/qwik";


export default component$(() => {
  return (
    <div class={styles.overlay}>
      <div class={styles.container}>
        <div class={styles.logoContainer}>
          <Image
            src="/images/logo.png"
            alt="Sistema Único Distrital"
            width={173}
            height={336}
            layout="constrained"
          />
        </div>
        <div class={styles.loginContainer}>
          <Image
            src="/images/logoAlcaldia.svg"
            alt="Alcaldía de Cartagena"
            width={106}
            height={106}
            layout="constrained"
          />
          <h2>Iniciar Sesión</h2>
          <p>Ingresa tus datos de usuario.</p>
          <form>
            <div class={styles.inputGroup}>
              <label for="usuario">Usuario</label>
              <input type="text" id="usuario" placeholder="Identificación" />
            </div>
            <div class={styles.inputGroup}>
              <label for="password">Contraseña</label>
              <input type="password" id="password" placeholder="Ingresa una contraseña" />
            </div>
            <div class={styles.buttonGroup}>
              <button type="submit" class={styles.btnPrimary}>
                Iniciar Sesión
              </button>
            </div>
            <a href="#" class={styles.olvidarPassword}>
              ¿Olvidaste tu contraseña?
            </a>
          </form>
        </div>
      </div>
    </div>
  );
});