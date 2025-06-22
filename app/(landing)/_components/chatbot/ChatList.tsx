import { checkMessageStatus } from "@/actions/checkMessageStatus";
import { checkOnlineStatus } from "@/actions/checkOnlineStatus";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChatPage } from "@/lib/definitions/enum";
import { cn } from "@/lib/utils";
import { User } from "next-auth";
import { useEffect, useState } from "react";

const ChatList = ({ onChange }: { onChange: (page: ChatPage) => any }) => {
  const [user, setUser] = useState<User | undefined>();
  const [isOnline, setIsOnline] = useState(false);
  const [messageStatus, setMessageStatus] = useState(false);

  const updateUser = async () => {
    const session = await getCurrentUser();
    setUser(session);
  };
  const updateStatus = async () => {
    const msgStatus = await checkMessageStatus();
    setMessageStatus(msgStatus);

    const response = await checkOnlineStatus();
    setIsOnline(response);
  };
  useEffect(() => {
    updateUser();
    updateStatus();
  }, []);
  return (
    <div className="flex flex-col h-full ">
      <div
        className="flex gap-x-4 items-center hover:bg-slate-100 cursor-pointer p-4 "
        onClick={() => onChange(ChatPage.AI)}
      >
        <Avatar className="rounded-full w-10 h-10 bg-slate-500">
          <AvatarImage src="/images/assistent.png" className="object-cover" />
        </Avatar>
        <p>Asisten AI</p>
        <div className=" w-3 h-3 rounded-full bg-green-500" />
      </div>
      {messageStatus && user && (
        <div
          className="flex gap-x-4 items-center hover:bg-slate-100 cursor-pointer p-4 "
          onClick={() => onChange(ChatPage.DOKTER)}
        >
          <Avatar className="rounded-full w-10 h-10 bg-slate-500">
            <AvatarImage src="/images/dokter.jpg" className="object-cover" />
          </Avatar>
          <p>Dokter Hema Malini</p>
          <div
            className={cn(
              " w-3 h-3 rounded-full",
              isOnline ? "bg-green-500" : "bg-gray-400"
            )}
          />
        </div>
      )}
    </div>
  );
};

export default ChatList;
