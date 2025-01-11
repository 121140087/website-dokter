import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { format } from "date-fns";
import { Divide, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { getSavedChat, saveChat } from "@/lib/actions";
import { ChatRole } from "@prisma/client";
import { randomUUID } from "crypto";
import { generateId } from "ai";
import ChatbotItem from "./ChatbotItem";

const ChatBot = () => {
  const [openChat, setOpenChat] = useState(false);
  const [isKonsultasi, setIsKonsultasi] = useState(false);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
    setInput,
    append,
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
  const onMessageSend = async (event: { preventDefault: () => void }) => {
    if (isKonsultasi) {
      event.preventDefault();
      if (input.length <= 0) return;
      await saveChat({
        text: input,
        chatRole: ChatRole.user,
      });
      setMessages([
        ...messages,
        {
          content: input,
          role: ChatRole.user,
          createdAt: new Date(),
          id: generateId(),
        },
      ]);
      setInput("");
    } else {
      handleSubmit(event);
    }
  };
  const updateMessage = async () => {
    const cMessages = await getSavedChat();
    if (
      cMessages.length > 0 &&
      cMessages[cMessages.length - 1].role === ChatRole.user
    ) {
      setIsKonsultasi(true);
    }
    setMessages([
      {
        id: generateId(),
        role: "assistant",
        content:
          "Halo saya adalah Asisten AI Dr. Irawan, Apakah ada yang bisa saya bantu?",
        createdAt: new Date(),
      },
      ...cMessages,
    ]);
  };
  useEffect(() => {
    updateMessage();
  }, []);
  const messageScrollRef = useRef(null);
  const toggleChat = () => {
    setOpenChat(!openChat);
  };
  useEffect(() => {
    if (messageScrollRef.current) {
      messageScrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <>
      <div
        className={cn(
          "cursor-pointer duration-500 fixed bottom-3 right-4 md:bottom-12 md:right-12 rounded-full aspect-square p-4 bg-slate-800 hover:bg-slate-600 flex items-center justify-center",
          openChat && "md:right-[-100px]"
        )}
        onClick={toggleChat}
      >
        <MessageCircle className="text-white w-8 h-8 " />
      </div>
      <div
        className={cn(
          "fixed bottom-0 sm:bottom-20 bg-white z-[60] w-screen sm:w-[450px] h-screen sm:h-[500px] right-0 sm:right-20 rounded shadow-md flex flex-col justify-between duration-500",
          !openChat && "right-[-500px] sm:right-[-500px]"
        )}
      >
        <div className="border-b-2 p-4 flex  justify-between items-center">
          <h2 className="font-bold">Dokter Irawan</h2>
          <X className="cursor-pointer" onClick={toggleChat} />
        </div>
        <ScrollArea className="h-full p-4 ">
          {messages.map((m) => (
            <ChatbotItem key={m.id} m={m} />
          ))}
          {messages.length > 1 && !isLoading && !isKonsultasi && (
            <div className="flex max-w-[250px] flex-col gap-y-2">
              <div className="p-2 rounded border">
                Konsultasi langsung dengan dokter?
              </div>
              <div className="flex gap-x-4">
                <Button
                  className="w-full"
                  onClick={() => setIsKonsultasi(true)}
                >
                  Iya
                </Button>
              </div>
            </div>
          )}
          {isLoading && (
            <div className="rounded shadow max-w-[250px] p-4">
              <Skeleton className="max-w-[150px]" />
              <Skeleton count={2} />
            </div>
          )}
          {messages[messages.length - 1].role === ChatRole.user &&
            !isLoading &&
            isKonsultasi && (
              <div className="flex max-w-[250px] flex-col gap-y-2">
                <div className="p-2 rounded border">
                  Dokter akan segera membalas pesanmu saat aktif. Ini mungkin
                  akan memerlukan waktu. <b>Berbicara dengan asisten AI?</b>
                </div>
                <div className="flex gap-x-4">
                  <Button
                    className="w-full"
                    onClick={() => setIsKonsultasi(false)}
                  >
                    Iya
                  </Button>
                </div>
              </div>
            )}
          <div ref={messageScrollRef} />
        </ScrollArea>
        <div className="flex flex-col justify-between p-4">
          <form onSubmit={onMessageSend}>
            <div className="flex gap-x-4 items-center">
              <Input
                placeholder="Kirim pesan"
                value={input}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <Send />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
