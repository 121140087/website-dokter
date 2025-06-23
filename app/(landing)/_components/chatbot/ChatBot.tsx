"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ChatBotMessageItem from "./ChatbotMessageItem";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
};

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      role: "assistant",
      content:
        "Halo saya adalah Asisten AI Dr. Hema Malini, Apakah ada yang bisa saya bantu?",
      createdAt: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const messageScrollRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [...messages, newMessage],
      }),
    });

    if (!res.ok) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "Maaf, terjadi kesalahan.",
          createdAt: new Date(),
        },
      ]);
      setIsLoading(false);
      return;
    }

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    let result = "";
    let done = false;

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        result += chunk;

        // Update pesan assistant setiap ada chunk baru
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            return [...prev.slice(0, -1), { ...last, content: result }];
          }
          return [
            ...prev,
            {
              id: Date.now().toString(),
              role: "assistant",
              content: result,
              createdAt: new Date(),
            },
          ];
        });
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (messageScrollRef.current) {
      messageScrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="h-full flex flex-col justify-between">
      <ScrollArea className="p-4 h-full">
        {messages.map((m) => (
          <ChatBotMessageItem key={m.id} m={m} />
        ))}
        <div ref={messageScrollRef} />
      </ScrollArea>
      <div className="flex flex-col justify-between p-4">
        <form onSubmit={sendMessage}>
          <div className="flex gap-x-4 items-center">
            <Input
              placeholder="Kirim pesan"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              <Send />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
