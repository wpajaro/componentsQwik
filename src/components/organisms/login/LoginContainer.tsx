import { component$, Slot, type QRL } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";
import { Card } from "@/components/molecules/Card/Card";
import styles from "./login.module.css";

interface LoginContainerProps {
  verticalLogoSrc?: string;
  horizontalLogoSrc?: string;
  logoSrc?: string;
  isMobile?: boolean;
  title?: string;
  subtitle?: string;
  onSubmit$?: QRL<() => void>;
}

export const LoginContainer = component$((props: LoginContainerProps) => {
  return (
    <div class={styles.overlay}>
      <div class={`${styles.container} container-fluid`}>
        {/* Logo superior que cambia según dispositivo */}
        <div class={`${styles.logoContainer} text-center`}>
          <Image
            src={props.isMobile ? props.horizontalLogoSrc : props.verticalLogoSrc}
            alt="Sistema Único Distrital"
            width={props.isMobile ? 100 : 173}
            height={props.isMobile ? 51 : 336}
            class="img-fluid"
          />
        </div>

          <Card
          bordered={true}
          hoverLift={false}
          direction="column"
          size="sm"
          width={'438px'}
          height='604px'
          radius={26}
          contentAlign="center"
        >
          <Image
            src={props.logoSrc}
            alt="Logo"
            width={106}
            height={106}
            class="img-fluid mx-auto d-block mb-4"
          />
          <h2 class="card-title text-center mb-3">{props.title}</h2>
          <p class="card-text custom-text-color mb-4">{props.subtitle}</p>

          <form preventdefault:submit onSubmit$={props.onSubmit$} class={styles.form}>
            <Slot /> {/* Para poder insertar los inputs y el botón */}
          </form>
        </Card>
      </div>
    </div>
  );
});
