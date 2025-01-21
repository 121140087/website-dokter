import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { MessageCircle, Send, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Chat, ChatRole } from "@prisma/client";
import MessageItem from "./MessageItem";
import { getChats } from "./_actions/getChats";
import { saveChat } from "@/lib/actions";

const ChatDokter = () => {
  const [messages, setMessages] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const updateMessage = async () => {
    const response = await getChats();
    setMessages(response);
  };
  useEffect(() => {
    updateMessage();
  }, []);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.length <= 0) {
      return;
    }
    await saveChat({
      chatRole: ChatRole.user,
      text: input,
    });
    setInput("");
    await updateMessage();
  };
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
          <MessageItem key={m.id} m={m} />
        ))}
        <div ref={messageScrollRef} />
      </ScrollArea>
      <div className="flex flex-col justify-between p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-x-4 items-center">
            <Input
              placeholder="Kirim pesan"
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
              disabled={loading}
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

export default ChatDokter;
