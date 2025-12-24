"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { services } from "@/lib/mock-data";
import { MapPin, Calendar as CalendarIcon, Clock, XCircle } from "lucide-react";
import { DateTimePicker } from "@/components/ui/scroll-picker";
import { format } from "date-fns";

export function BookingDrawer({ children }: { children: React.ReactNode }) {
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTime, setSelectedTime] = useState("1:30 PM");
  const [location, setLocation] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    // Handle booking submission
    console.log({
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      location,
    });
    setIsOpen(false);
    // Reset form
    setSelectedService("");
    setSelectedDate(undefined);
    setSelectedTime("");
    setLocation("");
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="max-h-[90vh] rounded-t-xl">
        <DrawerHeader className="px-6 pt-6 pb-4">
          <DrawerTitle className="text-center text-3xl font-bold text-black">
            Reserve rides in advance
          </DrawerTitle>
          <DrawerDescription className="text-center text-gray-600">
            When do you want to leave?
          </DrawerDescription>
          <p className="text-center text-sm text-gray-500">from {location}</p>
        </DrawerHeader>
        <div className="overflow-y-auto px-6 pb-4">
          <div className="space-y-6">
            <div className="space-y-4">
              <DateTimePicker
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                selectedTime={selectedTime}
                onTimeChange={setSelectedTime}
              />
            </div>

            <div className="space-y-4 border-t border-gray-200 pt-4">
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-5 w-5 text-gray-700" />
                <p className="text-sm text-gray-700">
                  Choose your exact pickup time up to 30 days in advance
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-700" />
                <p className="text-sm text-gray-700">
                  Extra wait time included to meet your ride
                </p>
              </div>
              <div className="flex items-center gap-3">
                <XCircle className="h-5 w-5 text-gray-700" />
                <p className="text-sm text-gray-700">
                  Cancel at no charge up to 60 minutes in advance
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Service Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {services.map((service, index) => (
                  <motion.button
                    key={service.id}
                    type="button"
                    onClick={() => setSelectedService(service.id)}
                    className={`rounded-xl border-2 p-4 text-left ${
                      selectedService === service.id
                        ? "border-black bg-black text-white"
                        : "border-gray-200 bg-white text-gray-900"
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{
                      scale: 1.05,
                      borderColor:
                        selectedService === service.id ? "black" : "gray",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="mb-2 text-2xl"
                      animate={
                        selectedService === service.id
                          ? { scale: 1.2, rotate: 5 }
                          : { scale: 1, rotate: 0 }
                      }
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {service.icon}
                    </motion.div>
                    <div className="text-sm font-semibold">{service.name}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Enter your address"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="rounded-xl border-gray-300 pl-10"
                />
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter className="p-6 pt-0">
          <Button
            onClick={handleSubmit}
            disabled={
              !selectedService || !selectedDate || !selectedTime || !location
            }
            className="w-full rounded-xl bg-black py-3.5 text-base font-semibold text-white hover:bg-gray-800"
          >
            Confirm Booking
          </Button>
          <DrawerClose asChild>
            <Button
              variant="outline"
              className="w-full rounded-xl border-gray-300 py-3.5 text-base"
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
