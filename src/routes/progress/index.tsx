import { component$ } from '@builder.io/qwik';
import ProgressBar from '~/components/molecules/Progress/ProgressBar';

export default component$(() => {
  return (
    <div class="container mt-5">
      <h2>Variantes de la Barra de Progreso</h2>

      <ProgressBar value={25} color="primary" />
      
      <ProgressBar value={50} color="secondary" />

      <ProgressBar value={75} color="success" />

      <ProgressBar value={100} color="info" />

      <ProgressBar value={45} color="danger" />
      
      <ProgressBar value={0} color="warning" />
      
      <ProgressBar value={10} color="light" />
    </div>
  );
});
