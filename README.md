# FixItNow Frontend 🔧
**A Home Service Marketplace — Next.js Frontend**

The frontend for FixItNow, a home services marketplace where customers browse and book technicians, technicians manage jobs and availability, and admins moderate the platform — all built on top of a separately deployed REST API.

---

## 🚀 Live Links

| Item | Link |
|------|------|
| **Live Frontend** | https://fixitnow-rifah.vercel.app |
| **Backend API** | https://fixitnow-mcum.onrender.com |
| **Backend Repo** | *(add your backend repo URL here)* |
| **Frontend GitHub Repo** | *(add your frontend repo URL here)* |
| **Demo Video** | *(add your video URL here)* |
| **API Integration Map** | [API_INTEGRATION.md](./API_INTEGRATION.md) |

> ⚠️ **Note:** The backend is deployed on Render's free tier, which spins down after ~15 minutes of inactivity. The first request after idle time may take 30–60 seconds while it wakes up.

---

## 🔑 Admin Credentials

```
Email    : admin@fixitnow.com
Password : Admin@123
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js (App Router) | React framework, routing, server/client components |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Shadcn UI (Radix primitives) | Component library |
| TanStack Query | Server state management, caching, mutations |
| React Hook Form + Zod | Form state and schema validation |
| Axios | API client |
| React Context + JWT cookie | Auth state, session persistence |
| Next.js Middleware | Route protection |
| SSLCommerz | Payment gateway (sandbox) |
| Vercel | Deployment |

---

## 👥 Roles & UI

| Role | Dashboard | Key Actions |
|------|-----------|--------------|
| **Customer** | `/dashboard/customer` | Browse services, book technicians, pay via SSLCommerz, track bookings, leave reviews |
| **Technician** | `/dashboard/technician` | Manage profile, add services, set availability, accept/decline/progress bookings |
| **Admin** | `/dashboard/admin` | View platform stats, manage users (ban/unban), manage categories |

The UI dynamically renders navigation and dashboards based on the authenticated user's role. Routes under `/dashboard/*` are protected server-side via Next.js Middleware, which checks for a valid session cookie before any page renders.

---

## 🔄 Core Flows

### Customer booking → payment
```
Browse Services → View Technician → Book Now (pick date/time)
   ↓
Wait for technician to Accept
   ↓
Pay Now → SSLCommerz sandbox checkout → redirected to /payment/success
   ↓
Track status (PAID → IN_PROGRESS → COMPLETED) → Leave Review
```

### Booking status badges
Each booking status renders as a distinct colored badge (`REQUESTED`, `ACCEPTED`, `DECLINED`, `PAID`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`), and only the actions valid for that status are shown to the technician — matching the backend's enforced state machine.

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
   (Or point to a locally running backend, e.g. `http://localhost:5000`.)

3. Run the dev server:
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000`.

---

## 🧱 Error Handling & Validation

- **Forms:** every form uses React Hook Form + Zod, with inline field-level error messages shown before submission.
- **API errors:** caught in each mutation's `onError` and surfaced as toast notifications (via `sonner`), reading the backend's structured `{ success, message, errorDetails }` response shape.
- **Route-level errors:** `error.tsx` boundaries catch unexpected render errors; `not-found.tsx` handles unmatched routes; `loading.tsx` files provide skeleton states during data fetching.
- **State isolation:** the TanStack Query cache is fully cleared on every login, logout, and registration, preventing stale data from a previous session/user from leaking into a new one.

---

## 💳 Payment Integration Notes

- Payment is initiated from a booking's "Pay Now" button, which calls the backend to create an SSLCommerz sandbox session and redirects the browser to the hosted checkout page.
- After payment, SSLCommerz redirects to the backend, which independently re-verifies the transaction before updating booking/payment status, then redirects the browser to this frontend's `/payment/success`, `/payment/fail`, or `/payment/cancel` page accordingly.
- No real transactions occur — SSLCommerz sandbox mode only.

---

## 📋 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@fixitnow.com | Admin@123 |
| Technician (seeded) | tech1@fixitnow.com | Tech@123 |

New customer and technician accounts can also be created via the Register page.