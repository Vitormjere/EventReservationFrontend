import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reserving, setReserving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchEvent() {
      try {
        const data = await api.get(`/api/Events/${id}`);
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  async function handleReserve() {
    setReserving(true);
    setMessage('');

    try {
      await api.post('/api/Reservations', { eventId: Number(id) });
      setMessage('Reserva realizada com sucesso!');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setReserving(false);
    }
  }

  async function handleDelete() {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este evento?');
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/Events/${id}`);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  }

  if (loading) return <p className="page">Carregando...</p>;
  if (error) return <p className="page message-error">{error}</p>;
  if (!event) return null;

  return (
    <div className="page">
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p className="event-meta">{new Date(event.eventDate).toLocaleString('pt-BR')}</p>
      <p className="event-meta">{event.location}</p>
      <p className="event-meta">Capacidade: {event.capacity}</p>
      <p className="event-meta">Organizado por: {event.organizerName}</p>

      {message && <p className="message-success">{message}</p>}

      <div className="button-group">
        {user && (
          <button className="btn-primary" onClick={handleReserve} disabled={reserving}>
            {reserving ? 'Reservando...' : 'Reservar'}
          </button>
        )}

        {user && (user.role === 'Admin' || user.name === event.organizerName) && (
          <>
            <button onClick={() => navigate(`/events/${id}/edit`)}>Editar</button>
            <button className="btn-danger" onClick={handleDelete}>Excluir</button>
          </>
        )}
      </div>
    </div>
  );
}

export default EventDetail;