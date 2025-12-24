export type Service = {
  id: string;
  name: string;
  icon: string;
};

export type Provider = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  hourlyRate: number;
  reviews: number;
  carModel?: string;
  licensePlate?: string;
};

export type Job = {
  id: string;
  serviceType: string;
  status: "pending" | "in_progress" | "completed";
  providerId?: string;
  providerName?: string;
  clientName?: string;
  date: string;
  time: string;
  location: string;
  amount?: number;
};

export const services: Service[] = [
  { id: "1", name: "Plumbing", icon: "🔧" },
  { id: "2", name: "Electrical", icon: "⚡" },
  { id: "3", name: "Painting", icon: "🎨" },
  { id: "4", name: "Gardening", icon: "🌱" },
  { id: "5", name: "Cleaning", icon: "🧹" },
  { id: "6", name: "Moving", icon: "📦" },
];

export const topProviders: Provider[] = [
  {
    id: "1",
    name: "John Smith",
    avatar: "JS",
    rating: 4.9,
    hourlyRate: 45,
    reviews: 127,
    carModel: "Silver Honda Civic",
    licensePlate: "3M53AF2",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    avatar: "SJ",
    rating: 4.8,
    hourlyRate: 50,
    reviews: 89,
    carModel: "White Toyota Camry",
    licensePlate: "ABC123X",
  },
  {
    id: "3",
    name: "Mike Davis",
    avatar: "MD",
    rating: 4.7,
    hourlyRate: 40,
    reviews: 156,
    carModel: "Blue Ford Focus",
    licensePlate: "DEF456Y",
  },
  {
    id: "4",
    name: "Emily Chen",
    avatar: "EC",
    rating: 5.0,
    hourlyRate: 55,
    reviews: 203,
    carModel: "Black Mercedes C-Class",
    licensePlate: "GHI789Z",
  },
];

export const mockJobs: Job[] = [
  {
    id: "1",
    serviceType: "Plumbing",
    status: "in_progress",
    providerId: "1",
    providerName: "John Smith",
    clientName: "Alice Johnson",
    date: "2024-01-15",
    time: "10:00 AM",
    location: "123 Main St",
    amount: 180,
  },
  {
    id: "2",
    serviceType: "Electrical",
    status: "pending",
    providerId: "2",
    providerName: "Sarah Johnson",
    clientName: "Bob Williams",
    date: "2024-01-16",
    time: "2:00 PM",
    location: "456 Oak Ave",
    amount: 100,
  },
  {
    id: "3",
    serviceType: "Cleaning",
    status: "completed",
    providerId: "3",
    providerName: "Mike Davis",
    clientName: "Charlie Brown",
    date: "2024-01-10",
    time: "9:00 AM",
    location: "789 Pine Rd",
    amount: 120,
  },
];
