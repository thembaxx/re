"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context";
import { Bell, CreditCard, LogOut, ChevronRight } from "lucide-react";

export default function SettingsPage() {
  const { auth, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push("/login");
    }
  }, [auth.isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const settingsItems = [
    {
      icon: Bell,
      title: "Notifications",
      description: "Manage your notification preferences",
      onClick: () => {},
    },
    {
      icon: CreditCard,
      title: "Payments",
      description: "Payment methods and billing",
      onClick: () => {},
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-6 pt-6">
        <h1 className="mb-6 text-2xl font-bold text-black">Settings</h1>
        <div className="space-y-3">
          {settingsItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="cursor-pointer rounded-xl border-gray-200 transition-all hover:border-black"
                onClick={item.onClick}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                      <Icon className="h-5 w-5 text-gray-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-black">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </CardContent>
              </Card>
            );
          })}
          <Card className="rounded-xl border-red-200 bg-red-50">
            <CardContent className="p-4">
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="w-full justify-start text-red-600 hover:bg-red-100"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

