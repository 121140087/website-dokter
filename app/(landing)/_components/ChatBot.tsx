import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { format } from "date-fns";
import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";

const ChatBot = () => {
  const [openChat, setOpenChat] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat();
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
          "fixed bottom-0 sm:bottom-20 bg-white z-[60] w-screen sm:w-[350px] h-screen sm:h-[500px] right-0 sm:right-20 rounded shadow-md flex flex-col justify-between duration-500",
          !openChat && "right-[-500px] sm:right-[-500px]"
        )}
      >
        <div className="border-b-2 p-4 flex  justify-between items-center">
          <h2 className="font-bold">Dokter Irawan</h2>
          <X className="cursor-pointer" onClick={toggleChat} />
        </div>
        <ScrollArea className="h-full p-4 ">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "rounded shadow mb-2 p-2 w-fit max-w-[250px] flex flex-col",
                m.role === "user" && "ml-auto text-end"
              )}
            >
              <Markdown children={m.content} />
              <p
                className={cn(
                  "text-end text-sm text-slate-600",
                  m.role === "user" && "text-start"
                )}
              >
                {format(m.createdAt?.toISOString()!, "hh:mm a")}
              </p>
            </div>
          ))}
          {isLoading && (
            <div className="rounded shadow max-w-[250px] p-4">
              <Skeleton className="max-w-[150px]" />
              <Skeleton count={2} />
            </div>
          )}
          <div ref={messageScrollRef} />
        </ScrollArea>
        <div className="flex flex-col justify-between p-4">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-x-4 items-center">
              <Input
                placeholder="Kirim pesan"
                value={input}
                onChange={handleInputChange}
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
