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

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!event) return null;

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>{new Date(event.eventDate).toLocaleString('pt-BR')}</p>
      <p>{event.location}</p>
      <p>Capacidade: {event.capacity}</p>
      <p>Organizado por: {event.organizerName}</p>

      {message && <p>{message}</p>}

      {user && (
        <button onClick={handleReserve} disabled={reserving}>
          {reserving ? 'Reservando...' : 'Reservar'}
        </button>
      )}

      {user && (user.role === 'Admin' || user.name === event.organizerName) && (
        <div>
          <button onClick={() => navigate(`/events/${id}/edit`)}>Editar</button>
          <button onClick={handleDelete}>Excluir</button>
        </div>
      )}
    </div>
  );
}

export default EventDetail;