"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, DollarSign, MessageCircle, Phone, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/lib/context";
import { mockJobs, services, topProviders } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push("/login");
    }
  }, [auth.isAuthenticated, router]);
  const isClient = auth.role === "client";

  const activeJobs = mockJobs.filter(
    (job) => job.status === "PENDING" || job.status === "IN_PROGRESS",
  );
  const completedJobs = mockJobs.filter((job) => job.status === "COMPLETED");

  const totalEarnings = mockJobs
    .filter((job) => job.priceEstimated && job.status === "COMPLETED")
    .reduce((sum, job) => sum + (job.priceEstimated || 0), 0);

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-6 pt-6">
        <h1 className="mb-6 text-2xl font-bold text-black">
          {isClient ? "My Requests" : "Upcoming Jobs"}
        </h1>
        {!isClient && (
          <div className="mb-6">
            <Card className="rounded-xl border-gray-200 bg-gray-50">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total Earnings</p>
                    <p className="text-xl font-bold text-black">${totalEarnings}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-black">
            Active {isClient ? "Requests" : "Jobs"}
          </h2>
          {activeJobs.length === 0 ? (
            <p className="text-gray-600">No active {isClient ? "requests" : "jobs"}</p>
          ) : (
            <motion.div
              className="space-y-4"
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
              {activeJobs.map((job) => {
                const provider = topProviders.find((p) => p.id === job.providerId);
                return (
                  <motion.div
                    key={job.id}
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
                    <Card className="rounded-xl border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold text-black">{job.title}</h3>
                          <span
                            className={cn(
                              "rounded-full px-3 py-1 text-xs font-medium",
                              job.status === "IN_PROGRESS"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800",
                            )}
                          >
                            {job.status === "IN_PROGRESS" ? "In Progress" : "Pending"}
                          </span>
                        </div>

                        {isClient && provider && (
                          <div className="flex items-center gap-4 mb-4">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="bg-gray-200 text-black">
                                {provider.avatarUrl}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-lg font-medium text-black">{provider.name}</p>
                              <div className="flex items-center text-sm text-gray-600">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                <span>{provider.rating}</span>
                                {/* {provider.carModel && (
                                  <>
                                    <span className="mx-2">•</span>
                                    <span>{provider.carModel}</span>
                                  </>
                                )} */}
                              </div>
                              {/* {provider.licensePlate && (
                                <p className="text-sm text-gray-600">
                                  License: {provider.licensePlate}
                                </p>
                              )} */}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center text-gray-600 text-sm mb-2">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>
                            {format(new Date(job.date), "MMM dd, yyyy")} at {job.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Location: {job.location.address}
                        </p>

                        {isClient && provider && (
                          <motion.div
                            className="flex gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                variant="outline"
                                className="flex-1 rounded-xl border-gray-300 text-black"
                              >
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Message
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                variant="outline"
                                className="flex-1 rounded-xl border-gray-300 text-black"
                              >
                                <Phone className="h-4 w-4 mr-2" />
                                Call
                              </Button>
                            </motion.div>
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
        <div>
          <h2 className="mb-4 text-lg font-semibold text-black">History</h2>
          {completedJobs.length === 0 ? (
            <p className="text-gray-600">No COMPLETED jobs</p>
          ) : (
            <div className="space-y-3">
              {completedJobs.map((job) => {
                const service = services.find((s) => s.name === job.title);
                return (
                  <Card
                    key={job.id}
                    className="rounded-xl border-gray-200 transition-all hover:border-black"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{service?.icon || "🔧"}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-black">{job.title}</p>
                          <p className="text-sm text-gray-600">
                            {isClient ? job.providerId : job.serviceId} •{" "}
                            {format(new Date(job.date), "MMM d, yyyy")}
                          </p>
                          {job.priceEstimated && (
                            <p className="mt-1 text-sm font-semibold text-black">
                              ${job.priceEstimated}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                          <Button variant="outline" className="rounded-xl border-gray-300 text-sm">
                            Rebook
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
