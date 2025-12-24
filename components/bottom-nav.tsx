"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  LayoutDashboard,
  User,
  Settings,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/messages", icon: MessageCircle, label: "Messages" },
  { href: "/profile", icon: User, label: "Profile" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function BottomNav() {
  const pathname = usePathname();
  const hideNav = ["/", "/login", "/signup"].includes(pathname);

  if (hideNav) return null;

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      <div className="mx-auto flex max-w-md items-center justify-around px-4 py-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
            >
              <Link href={item.href} className="block relative">
                <motion.div
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl px-4 py-2",
                    isActive ? "text-black" : "text-gray-500"
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <motion.div
                    animate={isActive ? { scale: 1.2 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                  <motion.span
                    className="text-xs font-medium"
                    animate={
                      isActive ? { fontWeight: 700 } : { fontWeight: 500 }
                    }
                  >
                    {item.label}
                  </motion.span>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-black"
                      layoutId="activeIndicator"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                      style={{
                        width: "4px",
                        height: "4px",
                        bottom: "8px",
                      }}
                    />
                  )}
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.nav>
  );
}
