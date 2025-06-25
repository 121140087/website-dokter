"use client";
import { checkOnlineStatus } from "@/actions/checkOnlineStatus";
import { setDokterStatusMessage } from "@/actions/setDokterMessageStatus";
import { setOnlineStatus } from "@/actions/setOnlineStatus";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";
import { ChatRoom } from "@prisma/client";
import { ChevronsUpDownIcon } from "lucide-react";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { getChatRooms } from "../_actions/getChatList";

const DaftarPesan = () => {
  const { id } = useParams();
  const [chatRooms, setChatRooms] = useState<ChatRoom[] | undefined>();
  const [messageStatus, setMessageStatus] = useState(true);
  const [search, setSearch] = useState<string>("");
  const [isOnline, setIsOnline] = useState(false);
  const router = useRouter();
  const chatChannelRef = useRef<ReturnType<typeof supabase.channel> | null>(
    null
  );
  const updateChatrooms = async () => {
    const response = await getChatRooms();
    setChatRooms(response);
  };
  const updateStatus = async () => {
    const response = await checkOnlineStatus();
    setIsOnline(response);
  };

  useEffect(() => {
    updateChatrooms();
    updateStatus();
  }, []);
  useEffect(() => {
    updateChatrooms();
    const interval = setInterval(() => {
      updateChatrooms();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
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
                onClick={() => router.push(`/dashboard/pesan/${c.id}`)}
                key={c.id}
                className={cn(
                  "cursor-pointer flex items-center p-4 border-b-2 justify-between",
                  id === c.id && "bg-slate-200"
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
  );
};

export default DaftarPesan;
