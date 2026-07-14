import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await api.get('/api/Events');
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) return <p>Carregando eventos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Lista de Eventos</h1>

      {events.length === 0 && <p>Nenhum evento disponível no momento.</p>}

      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <Link to={`/events/${event.id}`}>
              <h3>{event.title}</h3>
            </Link>
            <p>{new Date(event.eventDate).toLocaleString('pt-BR')}</p>
            <p>{event.location}</p>
            <p>Organizado por: {event.organizerName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;