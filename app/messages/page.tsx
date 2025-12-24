"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";

const mockMessages = [
  {
    id: "1",
    name: "Support Bot",
    avatar: "SB",
    lastMessage: "Hello! How can I help you today?",
    time: "2:30 PM",
    unread: 0,
  },
  {
    id: "2",
    name: "John Smith",
    avatar: "JS",
    lastMessage: "I'll be there at 10 AM",
    time: "Yesterday",
    unread: 2,
  },
];

const mockChatMessages = [
  { id: "1", sender: "bot", message: "Hello! How can I help you today?", time: "2:30 PM" },
  {
    id: "2",
    sender: "user",
    message: "I need help with my booking",
    time: "2:31 PM",
  },
  {
    id: "3",
    sender: "bot",
    message: "I'd be happy to help! What seems to be the issue?",
    time: "2:31 PM",
  },
];

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push("/login");
    }
  }, [auth.isAuthenticated, router]);

  if (selectedChat) {
    const chat = mockMessages.find((m) => m.id === selectedChat);
    return (
      <div className="flex min-h-screen flex-col bg-white pb-20">
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelectedChat(null)} className="text-gray-600">
              ← Back
            </button>
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gray-200 text-black">
                {chat?.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-black">{chat?.name}</p>
              <p className="text-xs text-gray-600">Online</p>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
          {mockChatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  msg.sender === "user"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                <p className="text-sm">{msg.message}</p>
                <p className="mt-1 text-xs opacity-70">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 bg-white px-6 py-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-xl border-gray-300"
              onKeyPress={(e) => {
                if (e.key === "Enter" && message.trim()) {
                  setMessage("");
                }
              }}
            />
            <Button
              className="rounded-xl bg-black text-white hover:bg-gray-800"
              onClick={() => {
                if (message.trim()) {
                  setMessage("");
                }
              }}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-6 pt-6">
        <h1 className="mb-6 text-2xl font-bold text-black">Messages</h1>
        <div className="space-y-3">
          {mockMessages.map((msg) => (
            <Card
              key={msg.id}
              className="cursor-pointer rounded-xl border-gray-200 transition-all hover:border-black"
              onClick={() => setSelectedChat(msg.id)}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gray-200 text-black">
                    {msg.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-black">{msg.name}</p>
                    <p className="text-xs text-gray-600">{msg.time}</p>
                  </div>
                  <p className="text-sm text-gray-600">{msg.lastMessage}</p>
                </div>
                {msg.unread > 0 && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                    {msg.unread}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

