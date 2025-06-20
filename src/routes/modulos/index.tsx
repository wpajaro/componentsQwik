import { component$, useStore, useTask$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { apiClient } from '@/services/apiClient';
import { getAccessToken } from '@/services/auth/handleLogin';
import { Card } from '@/components/molecules/Card/Card';
import { getFullImageUrl } from '@/Utils/getImageUrl';
import { setCachedModulos } from '@/context/contextModule';
import styles from './index.module.css';

interface Modulo {
  id: number;
  name: string;
  description?: string;
  image: string;
  option: {
    id: number;
    name: string;
    url: string;
  }[];
}

export default component$(() => {
  const state = useStore<{
    modulos: Modulo[];
    error: string;
    loading: boolean;
  }>({
    modulos: [],
    error: '',
    loading: true,
  });

  const nav = useNavigate();

  useTask$(async () => {
    const token = getAccessToken();
    if (!token) {
      nav('/login');
      return;
    }

    try {
      const res = await apiClient.get('/api/modules/user');
      state.modulos = res.data;
      console.log('Módulos del usuario:', res.data);

      setCachedModulos(res.data);
    } catch (err: any) {
      console.error('Error cargando módulos:', err);
      state.error = err.message || 'Error al cargar los módulos';
    } finally {
      state.loading = false;
    }
  });

  return (
    <div class="container-fluid px-0 py-5" style={{background: "url('/images/background2x.png') no-repeat center center/cover; width: 100%; height: 100vh;"}}>
      {state.loading && <div class="text-center">Cargando módulos...</div>}
      {state.error && <div class="alert alert-danger">{state.error}</div>}
      {!state.loading && state.modulos.length === 0 && !state.error && (
        <div class="alert alert-info text-center">No tienes módulos asignados.</div>
      )}

      <div class="row g-2 px-5">
        {state.modulos.map((modulo) => (
          <div class="col-12 col-md-6 col-lg-4" key={modulo.id}>
            <Card as='a' href={`/modulos/${modulo.id}`}
            bordered shaded hoverLift radius="12px" class={`h-100 ${styles.cardHover}`} contentAlign='center' style={{ backgroundColor: '#f2f2f2', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }}>
              <Card.Header>
                <div
                  style={{
                    width: '100%',
                    height: '60px',
                    marginTop: '20px',
                  }}
                >
                  <img
                    src={getFullImageUrl(modulo.image)}
                    alt={modulo.name}
                    width="70"
                    height="70"
                  />
                </div>
              </Card.Header>

              <Card.Body class="p-5" style={{ textAlign: 'center', color: '#04a139'}}>
                <h5 class="card-title">{modulo.name}</h5>
                <p class="card-text">{modulo.description}</p>
              </Card.Body>

              <Card.Footer class="card-footer d-flex flex-wrap gap-2">
                {modulo.option.map((opt) => (
                  <a
                    key={opt.id}
                    href={opt.url}
                    class="btn btn-outline-primary btn-sm"
                  >
                    {opt.name}
                  </a>
                ))}
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
});
