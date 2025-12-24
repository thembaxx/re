"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/lib/context";
import { services, topProviders } from "@/lib/mock-data";

export default function ServicePage() {
  const params = useParams();
  const router = useRouter();
  const { auth } = useAuth();
  const serviceId = params.id as string;
  const service = services.find((s) => s.id === serviceId);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push("/login");
    }
  }, [auth.isAuthenticated, router]);

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">Service not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-6 pt-6">
        <div className="mb-6 space-y-2">
          <div className="text-5xl">{service.icon}</div>
          <h1 className="text-2xl font-bold text-black">{service.name}</h1>
          <p className="text-gray-600">Find top-rated {service.name.toLowerCase()} professionals</p>
        </div>
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-black">Top Providers</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {topProviders.map((provider, index) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <Card className="min-w-50 shrink-0 rounded-xl border-gray-200">
                  <CardContent className="p-4">
                    <div className="mb-3 flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gray-200 text-black">
                          {provider.avatarUrl}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-black">{provider.name}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600">
                            {provider.rating} ({provider.rating})
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mb-3 text-sm text-gray-600">${provider.hourlyRate}/hr</p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="w-full rounded-xl bg-black text-white hover:bg-gray-800">
                        Book Now
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-semibold text-black">Popular Services</h2>
          <div className="space-y-3">
            {services
              .filter((s) => s.id !== serviceId)
              .slice(0, 3)
              .map((s) => (
                <Card
                  key={s.id}
                  className="rounded-xl border-gray-200 transition-all hover:border-black"
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <span className="text-3xl">{s.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-black">{s.name}</p>
                      <p className="text-sm text-gray-600">Available now • Starting at $30/hr</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
