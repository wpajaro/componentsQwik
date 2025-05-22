import { component$ } from '@builder.io/qwik';
import { Icon } from '~/components/atoms/Icon/Icon';
import { Acordeon, type AccordionItem } from '~/components/molecules/Accordion/Acordeon';
import { Card, CardBody, CardHeader } from '~/components/molecules/Card/Card';
export default component$(() => {
  
  const accordionItems: AccordionItem[] = [
    { 
      key: 'accordion-prueba1',
      title: 'Welcome to Qwik',
      content: <>
        {'Qwik is a new kind of web framework that can deliver instant loading web applications at any size or'}
        {'complexity. Your sites and apps can boot with about 1kb of JS (regardless of application complexity), and'}
        {'achieve consistent performance at scale.'}
      </>,
      icon: <Icon name= 'fa-solid fa-info-circle' size='md' class='icon-primary'/>
    },
    {
      key: 'accordion-prueba2',
      title: '¿Cómo funciona el Accordion?',
      content: 'You know Qwik. Developer experience is a core principle of Qwik. Built on top of JSX, functional components and reactivity, learning Qwik is a piece of cake',
      icon: <Icon name= 'fa-solid fa-exclamation-circle' size='md' class='icon-primary'/>,
    },
    {
      key: 'accordion-prueba3',
      title: '¿Puedo usar múltiples paneles abiertos?',
      content: 'Sí, configurando la propiedad multiple={true} puedes tener varios paneles expandidos simultáneamente.',
      icon: <Icon name= 'fa-solid fa-check-circle' size='md' class='icon-primary'/>
    }
  ];

  return (
    <div class="container mx-auto px-4 py-8">
      <h2>Demo del Componente Accordion</h2>
      
      <Card hoverLift={false} buttonSpacing='0' background='light'>
        <CardHeader>
          <h4>Variante Default</h4>
          <p>Texto pequeño de prueba</p>
        </CardHeader>
        <CardBody>
          <Card hoverLift={false}>
          <Acordeon 
          variant='default'        
          items={accordionItems} 
          colorScheme="primary"
          bordered={true}
        />
        </Card>
        </CardBody>
      </Card>

      <Card hoverLift={false} buttonSpacing='0'>
        <CardHeader>
          <h4>Variante Flush (sin bordes)</h4>
        </CardHeader>
        <CardBody>
          <Card hoverLift={false} buttonSpacing='0'>
          <Acordeon 
          variant="flush" 
          items={accordionItems} 
          colorScheme="secondary"
          bordered={false}
        />
        </Card>
        </CardBody>
      </Card>

      <Card hoverLift={false} buttonSpacing='0'>
        <CardHeader>
          <h4>Variante Dark</h4>
        </CardHeader>
        <CardBody>
          <Card hoverLift={false} buttonSpacing='0'>
            <Acordeon 
            variant="dark" 
            items={accordionItems} 
            colorScheme="light"
          />
          </Card>
        </CardBody>
      </Card>

      <Card hoverLift={false} buttonSpacing='0'>
        <CardHeader>
          <h4>Variante Outline</h4>
        </CardHeader>
        <CardBody>
            <Card hoverLift={false} buttonSpacing='0'>
              <Acordeon 
                variant="default" 
                items={accordionItems} 
                colorScheme="secondary"
              />
            </Card>
        </CardBody>
      </Card>

      <Card hoverLift={false} buttonSpacing='0'>
        <CardHeader>
          <h4>Con Íconos a la Izquierda</h4>
        </CardHeader>
        <CardBody>
          <Card hoverLift={false} buttonSpacing='0'>
            <Acordeon 
              variant="icon-prefix" 
              items={accordionItems} 
              colorScheme="success"
              iconPosition="left"
            />
          </Card>
        </CardBody>
      </Card>

      <Card hoverLift={false} buttonSpacing='0'>
        <CardHeader>
          <h4>Modo Múltiple</h4>
        </CardHeader>
        <CardBody>
          <Card hoverLift={false} buttonSpacing='0'>
            <Acordeon 
              multiple={true}
              items={accordionItems} 
              colorScheme="info"
            />
          </Card>
        </CardBody>
      </Card>

      <Card hoverLift={false} buttonSpacing='0'>
        <CardHeader>
          <h4>Horizontal</h4>
        </CardHeader>
        <CardBody>
          <Card hoverLift={false} buttonSpacing='0'>
            <Acordeon 
              variant="horizontal" 
              items={accordionItems} 
              colorScheme="danger"
            />
          </Card>
        </CardBody>
      </Card>

      <Card hoverLift={false} buttonSpacing='0'>
        <CardHeader>
          <h4>Con Contenido Slotted</h4>
        </CardHeader>
        <CardBody>
          <Card hoverLift={false} buttonSpacing='0'>
            <Acordeon 
              items={accordionItems.map(item => ({ ...item, content: undefined }))} 
              colorScheme="primary"
            >
              {accordionItems.map((item, index) => (
                <div key={`slot-item.triggerId || index}`} q:slot={`content-${index}`}class="p-4">
                  <p>Este es el contenido personalizado para el ítem {index + 1}</p>
                  <p class="mt-2 text-sm text-gray-600">Puedes poner cualquier JSX aquí</p>
                </div>
              ))}
            </Acordeon>
          </Card>
        </CardBody>
      </Card>

      <Card hoverLift={false} buttonSpacing='0'>
        <CardHeader>
          <h4>Con Íconos Personalizados</h4>
        </CardHeader>
        <CardBody>
          <Card hoverLift={false} buttonSpacing='0'>
            <Acordeon 
              items={accordionItems} 
              colorScheme="dark"
            />     
          </Card>
        </CardBody>
      </Card>

      <Card hoverLift={false} buttonSpacing='0'>
        <CardHeader>
          <h4>Multi-Toggle con Botones Externos</h4>       
        </CardHeader>
        <CardBody>
          <Card hoverLift={false} buttonSpacing='0'>
            <Acordeon 
              variant="multi-toggle" 
              items={accordionItems} 
              colorScheme="primary"
              multiple={true}
            />
          </Card>
        </CardBody>
      </Card>
    </div>
  );
});