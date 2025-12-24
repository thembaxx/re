"use client";

import { Edit, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/lib/context";

export default function ProfilePage() {
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push("/login");
    }
  }, [auth.isAuthenticated, router]);
  const initials = auth.email?.split("@")[0].substring(0, 2).toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-6 pt-6">
        <div className="mb-8 flex flex-col items-center">
          <Avatar className="mb-4 h-24 w-24">
            <AvatarFallback className="bg-gray-200 text-2xl text-black">{initials}</AvatarFallback>
          </Avatar>
          <h1 className="mb-2 text-2xl font-bold text-black">
            {auth.email?.split("@")[0] || "User"}
          </h1>
          <div className="mb-4 flex items-center gap-1">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="text-lg font-semibold text-black">4.8</span>
            <span className="text-sm text-gray-600">(127 reviews)</span>
          </div>
          <Button className="rounded-xl border-2 border-black bg-white text-black hover:bg-gray-50">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
        <div className="space-y-4">
          <Card className="rounded-xl border-gray-200">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600">Email</p>
                  <p className="font-semibold text-black">{auth.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Role</p>
                  <p className="font-semibold text-black capitalize">{auth.role || "Not set"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Member Since</p>
                  <p className="font-semibold text-black">January 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-xl border-gray-200">
            <CardContent className="p-4">
              <h2 className="mb-4 font-semibold text-black">Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600">Jobs Completed</p>
                  <p className="text-2xl font-bold text-black">42</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-black">$1,890</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
