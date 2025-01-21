import { cn } from "@/lib/utils";
import { Chat } from "@prisma/client";
import { format } from "date-fns";
import Markdown from "react-markdown";

const MessageItem = ({ m }: { m: Chat }) => {
  return (
    <div key={m.id}>
      <div
        className={cn(
          "rounded shadow max-w-[250px] mb-2 p-2 w-fit flex flex-col h-fit",
          m.role === "user" && "ml-auto text-end"
        )}
      >
        <Markdown children={m.message} />
        <p
          className={cn(
            "text-end text-sm text-slate-600",
            m.role === "user" && "text-start"
          )}
        >
          {format(m.createdAt?.toISOString()!, "hh:mm a")}
        </p>
      </div>
    </div>
  );
};

export default MessageItem;
