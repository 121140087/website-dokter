import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChatRole } from "@prisma/client";
import MessageItem from "./MessageItem";
import ChatBotMessageItem from "./ChatbotMessageItem";

const ChatBot = () => {
  const [isKonsultasi, setIsKonsultasi] = useState(false);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
    setInput,
  } = useChat({
    initialMessages: [
      {
        id: "192n39n12n378",
        role: "assistant",
        content:
          "Halo saya adalah Asisten AI Dr. Irawan, Apakah ada yang bisa saya bantu?",
        createdAt: new Date(),
      },
    ],
  });

  const updateMessage = async () => {};
  useEffect(() => {
    updateMessage();
  }, []);
  const messageScrollRef = useRef(null);
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
        <form onSubmit={handleSubmit}>
          <div className="flex gap-x-4 items-center">
            <Input
              placeholder="Kirim pesan"
              value={input}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <Button>
              <Send />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
