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

const PasienTableActions = ({ nik }: { nik: string }) => {
  const deletePasienAction = async () => {
    await deletePasien(nik);
    toast("Berhasil menghapus pasien");
    window.location.reload();
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
    </div>
  );
};

export default PasienTableActions;
