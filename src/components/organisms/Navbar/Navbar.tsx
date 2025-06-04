// src/components/navbar/navbar.tsx
import { component$ } from "@builder.io/qwik";
import { DropdownMenu } from "@/components/molecules/Menu/DropdownMenu";
import { Link } from "@builder.io/qwik-city";

export const Navbar = component$(() => {
  return (
    <header class="sticky top-0 z-50 w-full border-b bg-background">
      <div class="flex h-14 items-center px-4">
        {/* Logo y navegación */}
        <div class="mr-4 flex items-center justify-between w-full md:w-auto">
          <Link href="/" class="mr-6 flex items-center space-x-2">
            <span class="font-bold">MyComponents</span>
          </Link>
          <nav class="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/docs" class="transition-colors hover:text-foreground/80">
              Documentation
            </Link>
            <Link href="/components" class="transition-colors hover:text-foreground/80">
              Components
            </Link>
            <Link href="/examples" class="transition-colors hover:text-foreground/80">
              Examples
            </Link>
            <Link href="/themes" class="transition-colors hover:text-foreground/80">
              Themes
            </Link>
          </nav>
        </div>

        {/* Menú hamburguesa */}
        <div class="ml-auto flex items-center space-x-4 md:hidden">
          <DropdownMenu />
        </div>
      </div>
    </header>
  );
});
