import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import "../global.css/"

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  return (
    <div class="container">
      {/* Navbar */}
      <nav class="navbar">
        <div class="navbar-brand">
          <Link href="/">Biblioteca Qwik</Link>
        </div>
        <div class="navbar-links">
          <Link href="/buttons">Botones</Link>
          <Link href="/tagPill">Tag & Pill</Link>
          <Link href="/progress">Progreso</Link>
        </div>
      </nav>

      {/* Contenido principal */}
      <main class="main-content">
        <Slot />
      </main>

      {/* Footer */}
      <footer class="footer">
        © {new Date().getFullYear()} Biblioteca Qwik - Todos los derechos reservados
      </footer>
    </div>
  );
});