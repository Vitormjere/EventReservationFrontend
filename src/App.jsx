import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import EventList from './pages/EventList';
import EventForm from './pages/EventForm';
import MyReservations from './pages/MyReservations';
import EventDetail from './pages/EventDetail';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events/:id" element={<EventDetail />} />
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
        <Route
        path="/events/:id/edit"
          element={
            <ProtectedRoute allowedRoles={['Organizer', 'Admin']}>
              <EventForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;