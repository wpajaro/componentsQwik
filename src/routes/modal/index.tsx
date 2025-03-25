import { component$, $, useSignal } from "@builder.io/qwik";
import Modal from "~/components/organisms/modal/modal";
import Button from "~/components/atoms/button/button";

export default component$(() => {
    const showModal = useSignal(false);


    return (
        <>
            <Button label="Abrir Modal Simple" onClick$={() => (showModal.value = true)} color="secondary"/>
            <Modal
                show={showModal.value}
                onClose={$(() => { showModal.value = false; })}
                titulo="Confirmación"
            >
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            </Modal>
        </>
    );
});


