import { component$, useSignal } from "@builder.io/qwik";
import Input from "~/components/atoms/Input/Input";

export default component$(() => {
  const email = useSignal("");
  const password = useSignal("");

  return (
    <div class="container mt-4">
      <Input 
        label="Email" 
        type="email" 
        placeholder="Enter Your Email" 
        value={email.value} onChange$={(val) => (email.value = val)} 
        />
      <Input 
        label="Password" 
        type="password" 
        placeholder="Enter Your Password" 
        value={password.value} onChange$={(val) => (password.value = val)} 
        />
    </div>
  );
});
