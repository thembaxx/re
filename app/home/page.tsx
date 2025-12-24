"use client";

import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BookingDrawer } from "@/components/booking-drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/context";
import { services } from "@/lib/mock-data";

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
    service.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="sticky top-0 z-10 bg-white px-6 pt-6 pb-4">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-black">What do you need help with?</h1>
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
        <motion.div
          className="grid grid-cols-2 gap-4 sm:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  },
                },
              }}
            >
              <Link href={`/services/${service.id}`} className="group block">
                <motion.div
                  className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-6"
                  whileHover={{
                    scale: 1.05,
                    borderColor: "black",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  }}
                >
                  <motion.span
                    className="mb-3 text-4xl"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {service.icon}
                  </motion.span>
                  <span className="text-sm font-semibold text-gray-900">{service.name}</span>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <motion.div
        className="fixed bottom-24 right-6 z-40"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.3,
        }}
      >
        <BookingDrawer>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              size="lg"
              className="h-14 w-14 rounded-full bg-black shadow-lg hover:bg-gray-800"
            >
              <Plus className="h-6 w-6 text-white" />
            </Button>
          </motion.div>
        </BookingDrawer>
      </motion.div>
    </div>
  );
}
