import { component$, Slot, useTask$, useStore } from "@builder.io/qwik";
import { useLocation, Link } from "@builder.io/qwik-city";
import "../global.css";

export default component$(() => {
  const location = useLocation();
  const state = useStore({ isLoginPage: false });

  useTask$(({ track }) => {
    track(() => location.url.pathname); // Se ejecuta cada vez que cambia la URL
    state.isLoginPage = location.url.pathname.startsWith("/login");
  });

  return (
    <div class="container">
      {/* Navbar (Oculta si estamos en /login) */}
      {!state.isLoginPage && (
        <nav class="navbar">
          <div class="navbar-brand">
            <Link href="/">Biblioteca de Componentes SIUD</Link>
          </div>
          <div class="navbar-links">
            <Link href="/buttons">Botones</Link>
            <Link href="/tagPill">Tag & Pill</Link>
            <Link href="/login">Login</Link>
            <Link href="/modal">Modales</Link>
          </div>
        </nav>
      )}

      {/* Contenido principal */}
      <main class="main-content">
        <Slot />
      </main>

      {/* Footer (Oculta si estamos en /login) */}
      {!state.isLoginPage && (
        <footer class="footer">
          © {new Date().getFullYear()} Biblioteca de Componentes SIUD - Todos los derechos reservados
        </footer>
      )}
    </div>
  );
});
