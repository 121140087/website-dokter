import { X } from "lucide-react";

const ChatList = () => {
  return (
    <div className="flex flex-col h-full ">
      <div className="flex gap-x-4 items-center hover:bg-slate-100 cursor-pointer p-4 ">
        <div className="rounded-full w-10 h-10 bg-slate-500" />
        <p>Chatbot</p>
      </div>
      <div className="flex gap-x-4 items-center hover:bg-slate-100 cursor-pointer p-4 ">
        <div className="rounded-full w-10 h-10 bg-slate-500" />
        <p>Dokter Irawan</p>
      </div>
    </div>
  );
};

export default ChatList;
