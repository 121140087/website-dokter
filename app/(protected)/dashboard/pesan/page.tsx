import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

const PesanPage = () => {
  return (
    <div className="grid grid-cols-4 w-full">
      <div className="relative top-0 left-0 h-[calc(100vh-72px)] border-r-2 w-full">
        <div className="flex items-center p-4 border-b-2 justify-between">
          <div className="flex gap-x-4 items-center">
            <Avatar>
              <AvatarImage src="/images/elon.jpg" />
            </Avatar>
            <p>John</p>
          </div>
          <p className="text-slate-400">2 menit</p>
        </div>
      </div>
      <div className="col-span-3 p-4 flex flex-col justify-end">
        <div className="h-full flex flex-col gap-y-2">
          <div className="rounded shadow w-fit h-fit p-2 flex flex-col max-w-[650px]">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
              corrupti?
            </p>
            <p className="text-sm text-slate-500 text-end">12:41</p>
          </div>
          <div className="rounded shadow bg-green-100 w-fit h-fit p-2 flex flex-col max-w-[650px]">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
              corrupti?
            </p>
            <p className="text-sm text-slate-500 text-end">12:41</p>
          </div>
        </div>
        <div className="flex gap-x-4 mb-8 items-center">
          <Textarea placeholder="Pesan" />
          <Button>
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PesanPage;
