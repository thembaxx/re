// types/index.ts

export type UserRole = 'CLIENT' | 'PROVIDER';

export type JobStatus = 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  // Provider specific fields
  rating?: number;
  jobsCompleted?: number;
  hourlyRate?: number;
  specialty?: string[]; // e.g. ["Plumbing", "Gas"]
  bio?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string; // Name of the Lucide icon, e.g., "Wrench"
  color: string; // Tailwind class for background, e.g., "bg-blue-100"
}

export interface JobRequest {
  id: string;
  clientId: string;
  providerId?: string; // Null if waiting for a provider to accept
  serviceId: string;
  status: JobStatus;
  title: string;
  description: string;
  date: string; // ISO Date string
  time: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  priceEstimated: number;
}