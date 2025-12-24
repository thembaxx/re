// lib/mockData.ts
import type { JobRequest, ServiceCategory, User } from "@/types";

// 1. Service Categories (for the Home Page Grid)
export const CATEGORIES: ServiceCategory[] = [
  { id: "s1", name: "Plumbing", icon: "Droplets", color: "bg-blue-100" },
  { id: "s2", name: "Electrical", icon: "Zap", color: "bg-yellow-100" },
  { id: "s3", name: "Painting", icon: "PaintBucket", color: "bg-red-100" },
  { id: "s4", name: "Gardening", icon: "Sprout", color: "bg-green-100" },
  { id: "s5", name: "Moving", icon: "Truck", color: "bg-gray-100" },
  { id: "s6", name: "Cleaning", icon: "Sparkles", color: "bg-purple-100" },
];

// 2. Users (Top Providers & Current User)
export const MOCK_USERS: User[] = [
  {
    id: "u1",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "CLIENT",
    avatarUrl: "https://i.pravatar.cc/150?u=u1",
  },
  {
    id: "p1",
    name: "Sarah Conner",
    email: "sarah@fixit.com",
    role: "PROVIDER",
    rating: 4.9,
    jobsCompleted: 124,
    hourlyRate: 45,
    specialty: ["Plumbing", "Pipe Fitting"],
    avatarUrl: "https://i.pravatar.cc/150?u=p1",
    bio: "Certified master plumber with 10 years of experience.",
  },
  {
    id: "p2",
    name: "Mike Ross",
    email: "mike@electric.com",
    role: "PROVIDER",
    rating: 4.7,
    jobsCompleted: 89,
    hourlyRate: 60,
    specialty: ["Electrical", "Wiring"],
    avatarUrl: "https://i.pravatar.cc/150?u=p2",
    bio: "Fast and reliable electrician for home and office.",
  },
];

// 3. Jobs (For Dashboard & History)
export const MOCK_JOBS: JobRequest[] = [
  // Active Request (Show in Carousel)
  {
    id: "j1",
    clientId: "u1",
    providerId: "p1",
    serviceId: "s1",
    status: "IN_PROGRESS",
    title: "Leaking Sink Repair",
    description: "Kitchen sink pipe is leaking water rapidly.",
    date: "2023-10-25",
    time: "14:30",
    location: { address: "123 Maple St, Springfield", lat: 0, lng: 0 },
    priceEstimated: 85.0,
  },
  // Pending Request (Show in Carousel)
  {
    id: "j2",
    clientId: "u1",
    providerId: undefined, // No provider yet
    serviceId: "s2",
    status: "PENDING",
    title: "Install Ceiling Fan",
    description: "Need installation for a new fan in the living room.",
    date: "2023-10-28",
    time: "10:00",
    location: { address: "123 Maple St, Springfield", lat: 0, lng: 0 },
    priceEstimated: 120.0,
  },
  // Past Job (Show in History)
  {
    id: "j3",
    clientId: "u1",
    providerId: "p2",
    serviceId: "s3",
    status: "COMPLETED",
    title: "Bedroom Painting",
    description: "Paint two walls in the master bedroom.",
    date: "2023-09-15",
    time: "09:00",
    location: { address: "123 Maple St, Springfield", lat: 0, lng: 0 },
    priceEstimated: 200.0,
  },
];
