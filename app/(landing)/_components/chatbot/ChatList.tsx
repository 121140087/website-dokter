import { getCurrentUser } from "@/actions/getCurrentUser";
import { ChatPage } from "@/lib/definitions/enum";
import { User } from "next-auth";
import { useEffect, useState } from "react";

const ChatList = ({ onChange }: { onChange: (page: ChatPage) => any }) => {
  const [user, setUser] = useState<User | undefined>();
  const updateUser = async () => {
    const session = await getCurrentUser();
    setUser(session);
  };
  useEffect(() => {
    updateUser();
  }, []);
  return (
    <div className="flex flex-col h-full ">
      <div
        className="flex gap-x-4 items-center hover:bg-slate-100 cursor-pointer p-4 "
        onClick={() => onChange(ChatPage.AI)}
      >
        <div className="rounded-full w-10 h-10 bg-slate-500" />
        <p>Chatbot</p>
      </div>
      {user && (
        <div
          className="flex gap-x-4 items-center hover:bg-slate-100 cursor-pointer p-4 "
          onClick={() => onChange(ChatPage.DOKTER)}
        >
          <div className="rounded-full w-10 h-10 bg-slate-500" />
          <p>Dokter Irawan</p>
        </div>
      )}
    </div>
  );
};

export default ChatList;
