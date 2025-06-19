import { cn } from "@/lib/utils";
import { Chat } from "@prisma/client";
import Linkify from "linkify-react";
import moment from "moment";

const MessageItem = ({ m }: { m: Chat }) => {
  return (
    <div key={m.id}>
      <div
        className={cn(
          "rounded shadow max-w-[250px] mb-2 p-2 w-fit flex flex-col h-fit",
          m.role === "user" && "ml-auto text-end"
        )}
      >
        <p className={"max-w-[250px] break-words"}>
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
            {m.message}
          </Linkify>
        </p>
        <p
          className={cn(
            "text-end text-sm text-slate-600",
            m.role === "user" && "text-start"
          )}
        >
          {moment.utc(m.createdAt).local().fromNow()}
        </p>
      </div>
    </div>
  );
};

export default MessageItem;
