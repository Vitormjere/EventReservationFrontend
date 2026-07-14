import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import EventList from './pages/EventList';
import EventForm from './pages/EventForm';
import MyReservations from './pages/MyReservations';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/events/new"
          element={
            <ProtectedRoute allowedRoles={['Organizer', 'Admin']}>
              <EventForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-reservations"
          element={
            <ProtectedRoute>
              <MyReservations />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;