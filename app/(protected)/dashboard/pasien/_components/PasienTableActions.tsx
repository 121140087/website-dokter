import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { deletePasien } from "../_actions/deletePasien";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { ChatRole } from "@prisma/client";
import { saveChat } from "@/lib/actions";
import { getPasienByNIK } from "@/actions/getPasienByNIK";
import { getUserByNIK } from "@/actions/getUserByNIK";

const PasienTableActions = ({ nik }: { nik: string }) => {
  const [message, setMessage] = useState<string>("");
  const deletePasienAction = async () => {
    await deletePasien(nik);
    toast("Berhasil menghapus pasien");
    window.location.reload();
  };
  const onSendMessage = async () => {
    toast("Mengirim pesan");
    if (message.length <= 0) {
      return;
    }
    const user = await getUserByNIK(nik);
    if (!user) {
      toast("Gagal mengirim pesan");
      return;
    }
    await saveChat({
      chatRole: ChatRole.dokter,
      text: message,
      userId: user.id,
      name: user.nama,
    });
    setMessage("");
    toast("Berhasil mengirim pesan");
  };
  return (
    <div className="flex gap-x-2">
      <Link href={`/dashboard/pasien/${nik}`} className={buttonVariants()}>
        Edit
      </Link>
      <AlertDialog>
        <AlertDialogTrigger className="bg-destructive rounded p-2 text-white">
          Hapus
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Aksi ini akan menghapus data obat keseluruhan
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletePasienAction()}
              className="hover:bg-destructive"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog>
        <AlertDialogTrigger className="bg-primary  rounded p-2 text-white">
          Kirim Pesan
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kirim pesan</AlertDialogTitle>
            <AlertDialogDescription>
              Tulis pesan ke pasien
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            placeholder="Tulis pesan"
            value={message}
            onChange={(e) => {
              e.preventDefault();
              setMessage(e.currentTarget.value);
            }}
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onSendMessage()}
              className="hover:bg-slate-500"
            >
              Kirim
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PasienTableActions;
