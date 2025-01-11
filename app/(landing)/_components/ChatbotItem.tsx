import { cn } from "@/lib/utils";
import { Message } from "ai";
import { format } from "date-fns";
import Markdown from "react-markdown";

const ChatbotItem = ({ m }: { m: Message }) => {
  return (
    <div key={m.id}>
      <div
        className={cn(
          "rounded shadow max-w-[250px] mb-2 p-2 w-fit flex flex-col",
          m.role === "user" && "ml-auto text-end"
        )}
      >
        <Markdown children={m.content} />
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

export default ChatbotItem;
