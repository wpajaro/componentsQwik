import { component$, $, useSignal } from "@builder.io/qwik";
import Modal from "@/components/organisms/Modal/Modal";
import Button from "@/components/atoms/Button/Button";
import { Image } from "@unpic/qwik";
import styles from "@/components/organisms/Modal/modal.module.css"
//import { title } from "process";
import { Card } from "@/components/molecules/Card/Card";

export default component$(() => {
    // Variable para almacenar el ID del modal abierto (null si ninguno está abierto)
    const openModalId = useSignal<string | null>(null);
    const searchQuery = useSignal("");

    //Datos de la tabla de prueba
    const tableData = [
        { id: 1, name: "Juan Pérez", role: "Supervisor", status: "Activo" },
        { id: 2, name: "María Gómez", role: "Operario", status: "Inactivo" },
        { id: 3, name: "Carlos López", role: "Administrador", status: "Activo" },
        { id: 4, name: "Ana Torres", role: "Supervisor", status: "Activo" },
    ]

    // Lista de modales con su información
    const modals = [
        { 
            id: "modal1", 
            title: "Modal Simple", 
            sizeClass: styles.sm,
            content: [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam commodo nunc non tortor suscipit porta. Nunc at nunc eu est cursus",
                "vulputate a vitae ante. Duis nulla tortor, scelerisque ut finibus a, porttitor eu justo. Etiam sollicitudin eget odio non vehicula. Maecenas eu",
                "lectus metus. Sed non nunc mauris. Vivamus eget ligula sit amet nisi pretium viverra mattis maximus quam. Proin mi leo, consequat et",
                "diam eu, luctus venenatis purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed ut scelerisque."
            ],
            alignButtons: "right",
            hasImage: true,
            buttons: [
                { label: "Seguir explorando →", color: "primary", type: "fill", onClick: $(() => console.log("Confirmado")) }
            ]
        },

        { 
            id: "modal2", 
            title: "Scrolling Modal", 
            sizeClass: styles.sm,
            content: "Este es el segundo modal con más texto.", 
            alignButtons: "right",
            buttons: [
                { label: "Cancelar", color: "light", type: "fill", onClick: $(() => openModalId.value = null) },
                { label: "Guardar", color: "primary", type: "fill", onClick: $(() => console.log("Guardado"))}
            ] 
        },

        {
            id: "modalTable",
            title: "Data Table Modal",
            sizeClass: styles.sm,
            alignButtons: "right",
            buttons: [
                { label: "Cerrar", color: "primary", type: "outline", onClick: $(() => openModalId.value = null) }
            ],
            hasTable: true
        },

        {
            id: "modalVigencia",
            title: "Seleccionar Vigencia",
            sizeClass: styles.lg,
            alignButtons: "right",
            buttons: [
                { label: "Seleccionar", color: "primary", type: "fill", onClick: $(() => openModalId.value = null) }
            ]
        }
    ];

    return (
        <>
            {modals.map((modal) => (
                <Button 
                    key={modal.id} 
                    label={modal.title} 
                    onClick$={() => (openModalId.value = modal.id)} 
                    color="secondary"
                />
            ))}

            {modals.map((modal) => (
                <Modal
                    key={modal.id}
                    show={openModalId.value === modal.id}  
                    onClose={$(() => { openModalId.value = null; })}  
                    titulo={modal.title}
                    class={`${styles.modal} ${modal.sizeClass}`}
                >
                    {modal.hasImage && (
                        <Image 
                            src="/images/logoAlcaldia.svg"
                            alt="Imagen de prueba"
                            width={150}
                            height={150}
                            layout="constrained"
                        />
                    )}

                    {modal.hasTable ? (
                        <>
                        <input
                            type="text"
                            placeholder="Buscar..."
                            onInput$={(e) => searchQuery.value = (e.target as HTMLInputElement).value.toLowerCase()}
                            class={styles.search}
                        />
                        <div class={styles.tableContainer}>
                                <table class={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Rol</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData
                                            .filter(row => 
                                                row.name.toLowerCase().includes(searchQuery.value) ||
                                                row.role.toLowerCase().includes(searchQuery.value) ||
                                                row.status.toLowerCase().includes(searchQuery.value)
                                            )
                                            .map(row => (
                                                <tr key={row.id}>
                                                    <td>{row.id}</td>
                                                    <td>{row.name}</td>
                                                    <td>{row.role}</td>
                                                    <td>{row.status}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ): modal.id === "modalVigencia" ? (
                        <>
                            <Card
                                hoverLift={false}
                                style={{ backgroundColor: "#fff", borderRadius: "6px" }}>
                                    <div style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                                        gridAutoRows: "minmax((250px, auto))",
                                        gap: "0.5rem",
                                        width: "100%"
                                    }}>
                                    {[...Array(12)].map((_, i) => (
                                        <Card 
                                            key={i}
                                            style={{ 
                                            backgroundColor: "#f1f1f1", 
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                            }}
                                            size="lg"
                                        />
                                    ))}
                                </div>
                            </Card>
                        </>
                    ):(
                        <p>{modal.content}</p>
                    )}
                    
                    <div class={`${styles.actions} ${modal.alignButtons ? styles[modal.alignButtons] : ''}`}>
                        {modal.buttons.map((btn,index) => (
                            <Button
                                key={index}
                                label={btn.label}
                                color={btn.color as "secondary" | "primary" | "success" | "info" | "warning" | "danger" | "light"} 
                                type={btn.type as "fill" | "outline"}
                                onClick$={btn.onClick}
                            />
                        )
                    )}
                    </div>
                </Modal>
            ))}
        </>
    );
});
