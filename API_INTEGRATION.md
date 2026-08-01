# API Integration Map

This document maps every frontend component/page to the backend endpoint(s) it consumes.

**Backend API base URL:** `https://fixitnow-mcum.onrender.com`
**Backend repo:** *https://github.com/rifahjahantamanna/FixItNow.git*
---

## Auth

| Frontend | Backend Endpoint | Notes |
|---|---|---|
| `src/app/auth/register/page.tsx` | `POST /api/auth/register` | Registers customer or technician; auto-creates a blank `TechnicianProfile` server-side for technicians |
| `src/app/auth/login/page.tsx` | `POST /api/auth/login` | Returns JWT, stored in a cookie via `js-cookie` |
| `src/context/auth-context.tsx` | `GET /api/auth/me` | Called on app load to restore session from the token cookie |

## Public Pages

| Frontend | Backend Endpoint |
|---|---|
| `src/app/page.tsx` (Home) | `GET /api/services` |
| `src/app/services/page.tsx` | `GET /api/services` (with `search`, `categoryId`, `page` query params), `GET /api/categories` |
| `src/app/technicians/[id]/page.tsx` | `GET /api/technicians/:id` |

## Customer Dashboard

| Frontend | Backend Endpoint |
|---|---|
| `src/app/dashboard/customer/page.tsx` | `GET /api/bookings`, `GET /api/payments` |
| `src/app/dashboard/customer/book/[serviceId]/page.tsx` | `POST /api/bookings` |
| `src/app/dashboard/customer/bookings/[id]/pay/page.tsx` | `POST /api/payments/create` |
| `src/components/review-dialog.tsx` | `POST /api/reviews` |

## Payment Outcome Pages

| Frontend | Backend Endpoint | Notes |
|---|---|---|
| `src/app/payment/success/page.tsx` | — | Backend's `POST /api/payments/success` verifies the transaction with SSLCommerz, then redirects the browser here |
| `src/app/payment/fail/page.tsx` | — | Backend's `POST /api/payments/fail` redirects here |
| `src/app/payment/cancel/page.tsx` | — | Backend's `POST /api/payments/cancel` redirects here |

## Technician Dashboard

| Frontend | Backend Endpoint |
|---|---|
| `src/app/dashboard/technician/page.tsx` | `GET /api/bookings`, `PATCH /api/technician/bookings/:id` |
| `src/app/dashboard/technician/profile/page.tsx` | `GET /api/technician/profile`, `PUT /api/technician/profile` |
| `src/app/dashboard/technician/availability/page.tsx` | `GET /api/technician/availability`, `POST /api/technician/availability` |
| `src/components/add-service-dialog.tsx` | `POST /api/technician/services` |

## Admin Dashboard

| Frontend | Backend Endpoint |
|---|---|
| `src/app/dashboard/admin/page.tsx` | `GET /api/admin/users`, `GET /api/admin/bookings` (stats computed client-side from these) |
| `src/app/dashboard/admin/users/page.tsx` | `GET /api/admin/users`, `PATCH /api/admin/users/:id` |
| `src/app/dashboard/admin/categories/page.tsx` | `GET /api/admin/categories`, `POST /api/admin/categories`, `DELETE /api/admin/categories/:id` |

---

## Auth & Request Handling

All authenticated requests go through a single Axios instance (`src/lib/api.ts`) which:
- Attaches `Authorization: Bearer <token>` automatically via a request interceptor, reading the JWT from a cookie.
- Clears the token cookie automatically on any `401` response via a response interceptor.

## State Management

- **Server state** (anything fetched from the API): TanStack Query, via hooks in `src/lib/hooks/`. Mutations invalidate relevant query keys on success to keep the UI in sync (e.g. accepting a booking invalidates `["bookings"]`).
- **Auth state**: React Context (`src/context/auth-context.tsx`), backed by a JWT cookie for persistence across reloads.
- **Route protection**: Next.js Middleware (`middleware.ts`) blocks unauthenticated access to `/dashboard/*` at the server level before any page renders.

## Known Limitations

- Booking cancellation by the customer is not implemented — the backend does not currently expose a cancel endpoint.
- Next.js Middleware checks for the presence of a valid token only; role-specific access (e.g. a customer trying to load `/dashboard/admin`) is enforced client-side within each dashboard page via `useAuth()`, not at the Middleware layer.