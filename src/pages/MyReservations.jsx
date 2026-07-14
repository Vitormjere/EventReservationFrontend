import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReservations();
  }, []);

  async function fetchReservations() {
    setLoading(true);
    try {
      const data = await api.get('/api/Reservations/my');
      setReservations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel(reservationId) {
    const confirmCancel = window.confirm('Deseja cancelar esta reserva?');
    if (!confirmCancel) return;

    try {
      await api.delete(`/api/Reservations/${reservationId}`);
      fetchReservations();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p className="page">Carregando...</p>;
  if (error) return <p className="page message-error">{error}</p>;

  return (
    <div className="page">
      <h1>Minhas Reservas</h1>

      {reservations.length === 0 && <p>Você ainda não fez nenhuma reserva.</p>}

      <ul className="event-list">
        {reservations.map((reservation) => (
          <li key={reservation.id} className="event-card">
            <Link to={`/events/${reservation.eventId}`}>
              <h3>{reservation.eventTitle}</h3>
            </Link>
            <p className="event-meta">{new Date(reservation.eventDate).toLocaleString('pt-BR')}</p>
            <p className="event-meta">Status: {reservation.status}</p>

            {reservation.status === 'Confirmed' && (
              <button className="btn-danger" onClick={() => handleCancel(reservation.id)}>
                Cancelar Reserva
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyReservations;  