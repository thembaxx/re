"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/mock-data";
import { useAuth } from "@/lib/context";
import { BookingDrawer } from "@/components/booking-drawer";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push("/login");
    }
  }, [auth.isAuthenticated, router]);

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="sticky top-0 z-10 bg-white px-6 pt-6 pb-4">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-black">
            What do you need help with?
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-xl border-gray-300 pl-10"
            />
          </div>
        </div>
      </div>
      <div className="px-6 py-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {filteredServices.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="group"
            >
              <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-black hover:shadow-md">
                <span className="mb-3 text-4xl">{service.icon}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {service.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="fixed bottom-24 right-6 z-40">
        <BookingDrawer>
          <Button
            size="lg"
            className="h-14 w-14 rounded-full bg-black shadow-lg hover:bg-gray-800"
          >
            <Plus className="h-6 w-6 text-white" />
          </Button>
        </BookingDrawer>
      </div>
    </div>
  );
}

