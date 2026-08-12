# FixItNow Frontend 🔧
**A Home Service Marketplace — Next.js Frontend**

The frontend for FixItNow, a home services marketplace where customers browse and book technicians, technicians manage jobs and availability, and admins moderate the platform — all built on top of a separately deployed REST API.

---

## 🚀 Live Links

| Item | Link |
|------|------|
| **Live Frontend** | https://fixitnow-rifah.vercel.app |
| **Backend API** | https://fixitnow-mcum.onrender.com |
| **Backend Repo** | https://github.com/rifahjahantamanna/FixItNow.git |
| **Frontend GitHub Repo** | https://github.com/rifahjahantamanna/FixItNow-Frontend.git|
| **API Integration Map** | [API_INTEGRATION.md](./API_INTEGRATION.md) |

> ⚠️ **Note:** The backend is deployed on Render's free tier, which spins down after ~15 minutes of inactivity. The first request after idle time may take 30–60 seconds while it wakes up.

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@fixitnow.com | Admin@123 |
| **Technician** | tech1@fixitnow.com | Tech@123 |
| **Customer** | customer1@test.com | test123 |

One-click demo login buttons for all three roles are also available directly on the Login page.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js (App Router) | React framework, routing, server/client components, middleware |
| TypeScript | Type safety |
| Tailwind CSS | Styling, light/dark theming |
| Shadcn UI (Radix primitives) | Component library |
| TanStack Query | Server state management, caching, mutations |
| React Hook Form + Zod | Form state and schema validation |
| Recharts | Analytics charts (bookings by status, revenue by month) |
| Axios | API client |
| React Context + JWT cookie | Auth state, session persistence |
| next-themes | Light/dark mode toggle |
| Next.js Middleware | Route protection |
| SSLCommerz | Payment gateway (sandbox) |
| Vercel | Deployment |

---

## 👥 Roles & Dashboards

| Role | Sidebar | Key Actions |
|------|---------|--------------|
| **Customer** | Overview, Payments, Profile, Settings | Browse & book services, pay via SSLCommerz, track bookings, leave reviews, change password |
| **Technician** | Overview, Bookings, Availability, Profile | Manage profile, add services, set availability, accept/decline/progress bookings |
| **Admin** | Overview, Manage Users, Categories, Bookings, Analytics, Profile | Ban/unban users, manage categories, view all bookings (filter + paginate), view revenue/status charts |

All dashboard routes are protected server-side via Next.js Middleware. The UI adapts navigation, sidebar items, and available actions based on the authenticated user's role.

---

## ✨ Landing Page

A full 8-section landing page: animated Hero (rotating headline, scroll indicator) → How It Works → Categories → Featured Services → Live Stats → Testimonials (real reviews) → FAQ → Call to Action (adapts if already logged in).

---

## 🔄 Core Flow: Booking → Payment

```
Browse Services → View Technician → Book Now (pick date/time)
   ↓
Technician Accepts
   ↓
Pay Now → SSLCommerz sandbox checkout → redirected to /payment/success
   ↓
Track status (PAID → IN_PROGRESS → COMPLETED) → Leave Review
```

Booking status renders as a distinct colored badge at every stage, and only the actions valid for the current status are shown — matching the backend's enforced state machine.

---

## ⚙️ Local Setup

1. Clone and install:
   ```bash
   git clone <your-frontend-repo-url>
   cd fixitnow-frontend
   npm install
   ```

2. Create `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=https://fixitnow-mcum.onrender.com
   ```

3. Run the dev server:
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000`.

---

## 🧱 Error Handling & Validation

- **Forms:** every form (login, register, contact, booking, service creation, category, password change, profile) uses React Hook Form + Zod, with inline field-level error messages.
- **API errors:** caught and surfaced as toast notifications, reading the backend's structured `{ success, message, errorDetails }` response shape.
- **Route-level:** `error.tsx` boundaries, `not-found.tsx` for unmatched routes, and `loading.tsx` skeleton states during data fetching.
- **State isolation:** the TanStack Query cache is fully cleared on every login, logout, and registration, preventing stale data from a previous session/user from leaking into a new one.

---

## 💳 Payment Integration Notes

- Payment is initiated from a booking's "Pay Now" button, creating a real SSLCommerz sandbox session and redirecting to the hosted checkout page.
- After payment, SSLCommerz redirects to the backend, which independently re-verifies the transaction before updating status, then redirects the browser to this frontend's `/payment/success`, `/payment/fail`, or `/payment/cancel` page.
- Sandbox mode only — no real transactions occur.

---

## 📌 Known Limitations

- Social login (Google/Facebook) is not implemented.
- Editing an existing service is not yet supported (create-only).
- The contact form submits client-side only; there is no backend endpoint storing messages yet.
- The Admin Users table does not yet have filtering/pagination (the Admin Bookings table does).
- Technician details page does not yet support multiple images or "related items."