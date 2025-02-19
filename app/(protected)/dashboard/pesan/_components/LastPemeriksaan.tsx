"use client";
import { ChatRole, Pasien, Pemeriksaan, User } from "@prisma/client";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { File } from "lucide-react";
import { saveChat } from "@/lib/actions";
import { toast } from "sonner";
import Link from "next/link";
import { getUserById } from "@/actions/getUserById";
import { getLastPemeriksaanByNIK } from "../_actions/getLastPemeriksaan";

const LastPemeriksaan = ({
  userId,
  onPemeriksaanSended,
}: {
  userId: string;
  onPemeriksaanSended: () => void;
}) => {
  const [pemeriksaan, setPemeriksaan] = useState<Pemeriksaan>();
  const [user, setUser] = useState<User | null | undefined>();
  const updatePemeriksaan = async () => {
    const responsePasien = await getUserById(userId);
    setUser(responsePasien);
    if (responsePasien) {
      const response = await getLastPemeriksaanByNIK(responsePasien.nik!);
      if (response) {
        setPemeriksaan(response);
      }
    }
  };
  const sendPemeriksaan = async () => {
    if (pemeriksaan) {
      toast("Mengirim hasil pemeriksaan");
      saveChat({
        text: `${
          process.env.NEXT_PUBLIC_DOMAIN
        }/pemeriksaan/${pemeriksaan?.id!}`,
        chatRole: ChatRole.dokter,
        userId: userId,
      });
    }

    onPemeriksaanSended();
  };
  useEffect(() => {
    updatePemeriksaan();
  }, [userId]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} disabled={!userId}>
          <File />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Hasil Pemeriksaan Terakhir</DialogTitle>
        {pemeriksaan ? (
          <div className="flex flex-col gap-y-2">
            <div className="rounded flex flex-col border px-4 py-2">
              <p className="font-bold">Hasil Pemeriksaan</p>
              <p>{pemeriksaan?.diagnosis}</p>
              <p className="text-end font-bold">
                {format(pemeriksaan?.createdAt!, "dd MMM yyyy")}
              </p>
            </div>
            {user && (
              <Link
                href={`/dashboard/pemeriksaan/create/${user.nik}`}
                className={buttonVariants()}
              >
                Buat Pemeriksaan Baru
              </Link>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p>Belum ada pemeriksaan</p>
            {user && (
              <Link
                href={`/dashboard/pemeriksaan/create/${user.nik}`}
                className={buttonVariants()}
              >
                Buat Pemeriksaan Baru
              </Link>
            )}
          </div>
        )}
        <DialogFooter>
          {pemeriksaan && (
            <DialogClose asChild>
              <Button onClick={sendPemeriksaan}>Kirim Hasil Pemeriksaan</Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LastPemeriksaan;
