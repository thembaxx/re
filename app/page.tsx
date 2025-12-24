"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-black">TaskPro</h1>
          <p className="text-lg text-gray-600">
            Connect with skilled service providers or offer your services
          </p>
        </div>
        <div className="space-y-4">
          <Link href="/signup" className="block">
            <Button className="w-full rounded-xl bg-black px-8 py-6 text-base font-semibold text-white hover:bg-gray-800">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/login" className="block">
            <Button
              variant="outline"
              className="w-full rounded-xl border-2 border-gray-300 px-8 py-6 text-base font-semibold text-black hover:bg-gray-50"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
