import { component$ } from "@builder.io/qwik";
import { Card } from "@/components/molecules/Card/Card";

export default component$(() => {
  return (
    <Card
      bordered
      shaded={true}
      direction="column"
      size="lg"
      width={800}
      contentAlign="start"
      buttonAlign="start"
      imagenAling="end"
      buttonSpacing="0"
    >
      <Card.Header class="border-0 pb-0 card-header">
        <div class="d-flex justify-content-between w-100">
          <div>
            <h5 class="mb-1 fw-semibold text-dark">Basic Card</h5>
            <p class="mb-0 text-muted small">This is a simple card using anywhere.</p>
          </div>
        </div>
      </Card.Header>
      
      <Card.Body class="pt-3 card-body">
        <p class="text-muted small">
          Tabs have long been used to show alternative views of the same group of information tabs in software.
          Known as <span class="text-danger fw-semibold">“module tabs”</span>, these are still used today in web sites.
          For instance, airline companies such as Ryanair, easyJet and AirMalta use module tabs to enable the user
          to switch between bookings for flights, hotels and car hire.
        </p>
      </Card.Body>
    </Card>
  
  );
});
