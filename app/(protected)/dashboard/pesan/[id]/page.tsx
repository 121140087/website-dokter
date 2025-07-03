"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Textarea } from "@/components/ui/textarea";
import { saveChat } from "@/lib/actions";
import { supabase } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";
import { Chat, ChatRole } from "@prisma/client";
import Linkify from "linkify-react";
import { Send } from "lucide-react";
import moment from "moment";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { deleteMessage } from "../_actions/deleteMessage";
import { getChats } from "../_actions/getChats";
import LastPemeriksaan from "../_components/LastPemeriksaan";

const ChatDetail = () => {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState<Chat[] | undefined>();
  const [input, setInput] = useState("");
  const chatChannelRef = useRef<ReturnType<typeof supabase.channel> | null>(
    null
  );

  const messageScrollRef = useRef<null | HTMLDivElement>(null);
  const updateChat = async ({ userId }: { userId: string }) => {
    const response = await getChats({ userId });
    setChats(response);
  };
  const sendChat = async () => {
    saveChat({
      text: input,
      chatRole: ChatRole.dokter,
      userId: id as string,
    });
    setInput("");
  };
  async function connectToChannel(userId: string) {
    if (chatChannelRef.current) {
      await supabase.removeChannel(chatChannelRef.current);
      chatChannelRef.current = null;
    }

    const channel = supabase.channel(`realtime-chat-${userId}`);
    console.log(userId);
    channel
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Chat",
          filter: `userId=eq.${userId}`,
        },
        (payload) => {
          const newChat = payload.new as Chat;
          setChats((prev) => (prev ? [...prev, newChat] : [newChat]));
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
          setChats(
            (prev) => prev?.filter((chat) => chat.id !== deletedId) ?? []
          );
        }
      );
    channel.subscribe();
    chatChannelRef.current = channel;
  }

  useEffect(() => {
    if (!id) return;
    updateChat({ userId: id as string });
    connectToChannel(id as string);
    return () => {
      chatChannelRef.current?.unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (messageScrollRef.current) {
      messageScrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);
  

  return (
    <div className="h-[calc(100vh-72px)] col-span-3 p-4 flex flex-col justify-end">
      <div className="h-full flex flex-col gap-y-2 overflow-y-scroll">
        {chats &&
          chats.map((c) => {
            return (
              <ContextMenu key={c.id}>
                <ContextMenuTrigger>
                  <div
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
                              {content.startsWith(
                                process.env.NEXT_PUBLIC_DOMAIN!
                              )
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
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem
                    onClick={() => {
                      navigator.clipboard.writeText(c.message).then(() => {
                        toast.success("Pesan Disalin");
                      });
                    }}
                  >
                    Salin Pesan
                  </ContextMenuItem>
                  <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger asChild>
                      <ContextMenuItem onSelect={(e) => e.preventDefault()}>
                        Hapus Pesan
                      </ContextMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Yakin ingin menghapus pesan ini?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={async () => {
                            await deleteMessage(c);
                            toast.success("Pesan dihapus!");
                          }}
                        >
                          Ya, Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </ContextMenuContent>
              </ContextMenu>
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
          disabled={!id}
        />
        <LastPemeriksaan userId={id as string} onPemeriksaanSended={() => {}} />
        <Button onClick={sendChat} disabled={!id}>
          <Send />
        </Button>
      </div>
    </div>
  );
};

export default ChatDetail;
