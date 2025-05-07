// src/components/navbar/dropdown-menu.tsx
import { component$, useSignal } from "@builder.io/qwik";
import { MenuIcon } from "lucide-qwik";

export const DropdownMenu = component$(() => {
  const open = useSignal(false);

  return (
    <div class="relative">
      <button
        class="border rounded-md p-2"
        onClick$={() => (open.value = !open.value)}
        aria-label="Menu"
      >
        <MenuIcon class="h-4 w-4" />
      </button>

      {open.value && (
        <div class="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-50">
          <ul class="py-1 text-sm text-gray-700">
            <li class="hover:bg-gray-100 px-4 py-2 cursor-pointer">Profile</li>
            <li class="hover:bg-gray-100 px-4 py-2 cursor-pointer">Settings</li>
            <li class="hover:bg-gray-100 px-4 py-2 cursor-pointer">Help</li>
            <li class="hover:bg-gray-100 px-4 py-2 cursor-pointer">Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
});
