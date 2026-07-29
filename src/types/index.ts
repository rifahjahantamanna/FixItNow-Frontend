export type Role = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isBanned?: boolean;
  createdAt?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface TechnicianProfile {
  id: string;
  userId: string;
  bio?: string;
  skills: string[];
  experience: number;
  hourlyRate: string; // Prisma Decimal comes over JSON as a string
  user?: { id: string; name: string; email?: string };
}

export interface Service {
  id: string;
  title: string;
  description?: string;
  price: string;
  categoryId: string;
  technicianProfileId: string;
  category?: Category;
  technicianProfile?: TechnicianProfile;
}

export interface Booking {
  id: string;
  status: BookingStatus;
  customerId: string;
  technicianId: string;
  serviceId: string;
  scheduledAt: string;
  service?: Service;
  customer?: { id: string; name: string };
  technician?: { id: string; name: string };
  payment?: Payment;
  review?: Review;
}

export interface Payment {
  id: string;
  bookingId: string;
  transactionId?: string;
  amount: string;
  method?: string;
  provider: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
  paidAt?: string;
}

export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  rating: number;
  comment?: string;
}

// Matches your backend's ApiResponse shape exactly
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errorDetails: any;
}