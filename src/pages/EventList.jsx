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

  if (loading) return <p className="page">Carregando eventos...</p>;
  if (error) return <p className="page message-error">{error}</p>;

  return (
    <div className="page">
      <h1>Lista de Eventos</h1>

      {events.length === 0 && <p>Nenhum evento disponível no momento.</p>}

      <ul className="event-list">
        {events.map((event) => (
          <li key={event.id} className="event-card">
            <Link to={`/events/${event.id}`}>
              <h3>{event.title}</h3>
            </Link>
            <p className="event-meta">{new Date(event.eventDate).toLocaleString('pt-BR')}</p>
            <p className="event-meta">{event.location}</p>
            <p className="event-meta">Organizado por: {event.organizerName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;