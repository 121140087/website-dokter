"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveChat } from "@/lib/actions";
import { supabase } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";
import { Chat, ChatRole, ChatRoom } from "@prisma/client";
import { ChevronsUpDownIcon, Send } from "lucide-react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { getChatRooms } from "./_actions/getChatList";
import { getChats } from "./_actions/getChats";

import Linkify from "linkify-react";

import { checkOnlineStatus } from "@/actions/checkOnlineStatus";
import { setDokterStatusMessage } from "@/actions/setDokterMessageStatus";
import { setOnlineStatus } from "@/actions/setOnlineStatus";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import LastPemeriksaan from "./_components/LastPemeriksaan";
const PesanPage = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[] | undefined>();
  const [chats, setChats] = useState<Chat[] | undefined>();
  const [input, setInput] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [messageStatus, setMessageStatus] = useState(true);
  const [search, setSearch] = useState<string>("");
  const [isOnline, setIsOnline] = useState(false);
  const messageScrollRef = useRef<null | HTMLDivElement>(null);

  const updateChatrooms = async () => {
    const response = await getChatRooms();
    setChatRooms(response);
  };
  const updateChat = async ({ userId }: { userId: string }) => {
    const response = await getChats({ userId });
    setSelectedUserId(userId);
    setChats(response);
  };
  const updateStatus = async () => {
    const response = await checkOnlineStatus();
    setIsOnline(response);
  };
  const sendChat = async () => {
    saveChat({
      text: input,
      chatRole: ChatRole.dokter,
      userId: selectedUserId,
    });
    setInput("");
  };
  useEffect(() => {
    updateChatrooms();
    updateStatus();
  }, []);
  useEffect(() => {
    if (messageScrollRef.current) {
      messageScrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);
  useEffect(() => {
    if (!selectedUserId) return;

    const channel = supabase
      .channel(`realtime-chat-${selectedUserId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Chat",
          filter: `userId=eq.${selectedUserId}`,
        },
        (payload) => {
          const newChat = payload.new as Chat;
          setChats((prev) => (prev ? [...prev, newChat] : [newChat]));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedUserId]);
  useEffect(() => {
    const channel = supabase
      .channel("realtime-chatrooms")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "ChatRoom",
        },
        (payload) => {
          const updatedRoom = payload.new as ChatRoom;
          setChatRooms((prevRooms) => {
            if (!prevRooms) return [updatedRoom];

            const existingIndex = prevRooms.findIndex(
              (r) => r.id === updatedRoom.id
            );
            if (existingIndex !== -1) {
              const newRooms = [...prevRooms];
              newRooms[existingIndex] = updatedRoom;
              return newRooms.sort(
                (a, b) =>
                  new Date(b.updatedAt).getTime() -
                  new Date(a.updatedAt).getTime()
              );
            } else {
              return [updatedRoom, ...prevRooms];
            }
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="grid grid-cols-4 w-full h-[calc(100vh-72px)]">
      <div className="overflow-y-scroll relative top-0 left-0 h-[calc(100vh-72px)] border-r-2 w-full">
        <div className="w-full flex gap-x-2 items-center justify-between p-4">
          Status
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"} className="w-full justify-between">
                {messageStatus
                  ? isOnline
                    ? "Online"
                    : "Offline"
                  : "Tidak Menerima Pesan"}
                <ChevronsUpDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={async () => {
                  toast("Mengupdate status");
                  await setDokterStatusMessage(false);
                  setMessageStatus(false);
                  toast("Status terupdate");
                }}
              >
                Tidak Menerima Pesan
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  toast("Mengupdate status");
                  await setOnlineStatus(true);
                  await setDokterStatusMessage(true);
                  setMessageStatus(true);
                  setIsOnline(true);
                  toast("Status terupdate");
                }}
              >
                Online
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  toast("Mengupdate status");
                  await setOnlineStatus(false);
                  await setDokterStatusMessage(true);
                  setMessageStatus(true);
                  setIsOnline(false);
                  toast("Status terupdate");
                }}
              >
                Offline
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Input
          className="w-full my-2"
          placeholder="Cari..."
          value={search}
          onChange={(e) => {
            e.preventDefault();
            setSearch(e.currentTarget.value);
          }}
        />
        {chatRooms ? (
          chatRooms
            .filter((v) =>
              v.nama.toLowerCase().startsWith(search.toLocaleLowerCase())
            )
            .map((c) => {
              return (
                <div
                  onClick={() => updateChat({ userId: c.id })}
                  key={c.id}
                  className={cn(
                    "cursor-pointer flex items-center p-4 border-b-2 justify-between",
                    selectedUserId === c.id && "bg-slate-200"
                  )}
                >
                  <div className="flex gap-x-4 items-center">
                    <Avatar>
                      <AvatarImage src="/images/user.png" />
                    </Avatar>
                    <p>{c.nama}</p>
                  </div>
                  <p className="text-slate-400">
                    {moment.utc(c.updatedAt).local().fromNow()}
                  </p>
                </div>
              );
            })
        ) : (
          <p className="text-center">Tidak ada pesan</p>
        )}
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
                  <Linkify
                    options={{
                      render: ({ attributes, content }) => {
                        return (
                          <a
                            {...attributes}
                            className="bg-slate-500 text-white px-4 py-2 rounded text-sm hover:bg-slate-600 transition"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {content.startsWith(process.env.NEXT_PUBLIC_DOMAIN!)
                              ? "Lihat Hasil Pemeriksaan"
                              : content}
                          </a>
                        );
                      },
                    }}
                  >
                    {c.message}
                  </Linkify>
                  <p className="text-sm text-slate-500 text-end">
                    {moment.utc(c.createdAt).local().fromNow()}
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
