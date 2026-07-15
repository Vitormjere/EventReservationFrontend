# EventReservation Frontend

A React frontend for the EventReservation API, browse events, reserve a spot, and manage your reservations, with role-based access for organizers and admins.

## About the project

Built to consume the [EventReservation API](https://github.com/Vitormjere/EventReservation), focusing on JWT authentication in a SPA, protected routes based on user role, and a clean integration between frontend and backend.

## Tech stack

React · Vite · React Router · Context API (authentication state) · Plain CSS (custom dark theme) · Vercel (hosting)

## Features

- User login and registration
- JWT stored in localStorage, sent automatically on authenticated requests
- Role-based UI and route protection (`Participant`, `Organizer`, `Admin`)
- Event listing and detail pages
- Event creation and editing (Organizer/Admin only, with ownership checks enforced by the API)
- Event reservation and cancellation
- "My Reservations" page

## Running locally

**Prerequisites:** Node.js, the [EventReservation API](https://github.com/Vitormjere/EventReservation) running locally or accessible remotely

```bash
git clone https://github.com/Vitormjere/EventReservationFrontend.git
cd EventReservationFrontend
npm install
```

Create a `.env.local` file in the project root:
```
VITE_API_URL=https://localhost:7185
```

Run the dev server:
```bash
npm run dev
```

## Live site

`https://event-reservation-frontend.vercel.app`

Backend API: `https://eventreservation-api-vitor-dugnc2fra6d3hne7.brazilsouth-01.azurewebsites.net`

Default admin account (seeded automatically on the backend):
- Email: `admin@eventreservation.com`
- Password: `Admin@123`

## Technical Documentation

A complete technical write-up (architecture decisions, code walkthroughs, and real debugging challenges) is available here:
[EventReservation_Documentacao.pdf](./docs/EventReservation_Documentacao.pdf)

## Author

Vitor Miranda Jeremias — [GitHub](https://github.com/Vitormjere)
