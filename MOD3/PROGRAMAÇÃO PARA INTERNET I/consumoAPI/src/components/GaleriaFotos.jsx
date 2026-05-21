import { useState, useEffect } from 'react';
import axios from 'axios';

export default function GaleriaFotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get('https://jsonplaceholder.typicode.com/photos?_limit=10')
      .then((response) => {
        setPhotos(response.data);
      })
      .catch(() => {
        setError('Erro ao carregar as fotos.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="page-section">
      <div className="panel panel-gallery">
        <div className="panel-header">
          <h2>Galeria de Fotos</h2>
          <p>Exibindo 10 imagens a partir da API.</p>
        </div>

        {loading ? (
          <div className="status-text">Carregando fotos...</div>
        ) : error ? (
          <div className="status-text status-error">{error}</div>
        ) : (
          <div className="photo-grid">
            {photos.map((photo) => (
              <article className="photo-card" key={photo.id}>
                <img src={photo.thumbnailUrl} alt={photo.title} />
                <p>{photo.title}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
