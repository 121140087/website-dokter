import { supabase } from "@/lib/supabaseClient";

import { getCurrentUser } from "@/actions/getCurrentUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { saveChat } from "@/lib/actions";
import { Chat, ChatRole } from "@prisma/client";
import { Send } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import MessageItem from "./MessageItem";
import { getChats } from "./_actions/getChats";

const ChatDokter = () => {
  const [messages, setMessages] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState<string | undefined>();
  const updateMessage = async () => {
    const response = await getChats();
    setMessages(response);
  };
  const updateUserId = async () => {
    const user = await getCurrentUser();
    if (user) setUserId(user.id);
  };
  useEffect(() => {
    updateUserId();
    updateMessage();
    const channel = supabase
      .channel("chat-room")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Chat",
          filter: `userId=eq.${userId}`,
        },
        (payload) => {
          const newMessage = payload.new as Chat;
          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "Chat",
        },
        (payload) => {
          const deletedId = payload.old.id;
          setMessages(
            (prev) => prev?.filter((chat) => chat.id !== deletedId) ?? []
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
  };
  const messageScrollRef = useRef<null | HTMLDivElement>(null);
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
