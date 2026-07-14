import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="sidebar">
      <div className="sidebar-brand">EventReservation</div>

      <Link to="/">Eventos</Link>

      {user ? (
        <>
          {(user.role === 'Organizer' || user.role === 'Admin') && (
            <Link to="/events/new">Criar Evento</Link>
          )}
          <Link to="/my-reservations">Minhas Reservas</Link>

          <div className="sidebar-spacer"></div>

          <span className="navbar-user">Olá, {user.name}</span>
          <button onClick={handleLogout}>Sair</button>
        </>
      ) : (
        <>
          <div className="sidebar-spacer"></div>
          <Link to="/login">Login</Link>
          <Link to="/register">Registrar</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;