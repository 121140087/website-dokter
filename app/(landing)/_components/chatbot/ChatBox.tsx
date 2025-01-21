import { cn } from "@/lib/utils";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import ChatList from "./ChatList";
import ChatBot from "./ChatBot";
import ChatDokter from "./ChatDokter";
enum ChatPage {
  CHATLIST,
  AI,
  DOKTER,
}
const ChatBox = () => {
  const [chatPage, setChatPage] = useState<ChatPage>(ChatPage.CHATLIST);
  const [openChat, setOpenChat] = useState(false);
  const toggleChat = () => {
    setOpenChat(!openChat);
  };

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
          "fixed  bottom-0 sm:bottom-20 bg-white z-[60] w-screen sm:w-[450px] h-screen sm:h-[500px] right-0 sm:right-20 rounded shadow-md flex flex-col justify-between duration-500",
          !openChat && "right-[-500px] sm:right-[-500px]"
        )}
      >
        <div className="border-b-2 p-4 flex  justify-between items-center">
          <h2 className="font-bold">Dokter Irawan</h2>
          <X className="cursor-pointer" onClick={toggleChat} />
        </div>
        <div className="h-full overflow-hidden">
          <ChatDokter />
        </div>
      </div>
    </>
  );
};

export default ChatBox;
