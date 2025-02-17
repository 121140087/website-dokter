"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { File, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getChatRooms } from "./_actions/getChatList";
import { Chat, ChatRole, ChatRoom } from "@prisma/client";
import moment from "moment";
import { getChats } from "./_actions/getChats";
import { saveChat } from "@/lib/actions";
import { cn } from "@/lib/utils";
import Linkify from "linkify-react";

import LastPemeriksaan from "./_components/LastPemeriksaan";
const PesanPage = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[] | undefined>();
  const [chats, setChats] = useState<Chat[] | undefined>();
  const [input, setInput] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const messageScrollRef = useRef(null);

  const updateChatrooms = async () => {
    const response = await getChatRooms();
    setChatRooms(response);
  };
  const updateChat = async ({ userId }: { userId: string }) => {
    const response = await getChats({ userId });
    setSelectedUserId(userId);
    setChats(response);
  };
  const sendChat = async () => {
    saveChat({
      text: input,
      chatRole: ChatRole.dokter,
      userId: selectedUserId,
    });
    setInput("");
    updateChat({ userId: selectedUserId });
  };
  useEffect(() => {
    updateChatrooms();
  }, []);
  useEffect(() => {
    if (messageScrollRef.current) {
      messageScrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);
  return (
    <div className="grid grid-cols-4 w-full h-[calc(100vh-72px)]">
      <div className="overflow-y-scroll relative top-0 left-0 h-[calc(100vh-72px)] border-r-2 w-full">
        {chatRooms &&
          chatRooms.map((c) => {
            return (
              <div
                onClick={() => updateChat({ userId: c.id })}
                key={c.id}
                className="cursor-pointer flex items-center p-4 border-b-2 justify-between"
              >
                <div className="flex gap-x-4 items-center">
                  <Avatar>
                    <AvatarImage src="/images/elon.jpg" />
                  </Avatar>
                  <p>{c.nama}</p>
                </div>
                <p className="text-slate-400">
                  {moment(c.updatedAt).fromNow()}
                </p>
              </div>
            );
          })}
      </div>
      <div className="h-[calc(100vh-72px)] col-span-3 p-4 flex flex-col justify-end">
        <div className="h-full flex flex-col gap-y-2 overflow-y-scroll">
          {chats &&
            chats.map((c) => {
              return (
                <div
                  key={c.id}
                  className={cn(
                    "rounded shadow w-fit h-fit p-2 flex flex-col max-w-[650px]",
                    c.role === ChatRole.dokter && "ml-auto"
                  )}
                >
                  <Linkify>{c.message}</Linkify>
                  <p className="text-sm text-slate-500 text-end">
                    {moment(c.createdAt).fromNow()}
                  </p>
                </div>
              );
            })}
          <div ref={messageScrollRef} />
        </div>
        <div className="flex gap-x-4 items-center">
          <Textarea
            placeholder="Pesan"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onSubmit={sendChat}
            className="resize-none"
            disabled={!selectedUserId}
          />
          <LastPemeriksaan
            userId={selectedUserId}
            onPemeriksaanSended={() => {
              updateChat({ userId: selectedUserId });
            }}
          />
          <Button onClick={sendChat} disabled={!selectedUserId}>
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PesanPage;
