import { updatePaymentStatus } from "@/actions/updatePaymentStatus";
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
import { buttonVariants } from "@/components/ui/button";
import { Pemeriksaan } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { deletePemeriksaan } from "../_actions/deletePemeriksaan";
import { getPemeriksaanById } from "../_actions/getPemeriksaanById";

const PemeriksaanTableAction = ({ id }: { id: string }) => {
  const [pemeriksaan, setPemeriksaan] = useState<Pemeriksaan>();
  const deletePemeriksaanAction = async () => {
    await deletePemeriksaan(id);
    toast("Berhasil menghapus pasien");
    window.location.reload();
  };
  const setToPayed = async () => {
    toast("Mengupdate status pembayaran");
    await updatePaymentStatus(id, true);
    window.location.reload();
  };
  const setToUnpayed = async () => {
    toast("Mengupdate status pembayaran");
    await updatePaymentStatus(id, false);
    window.location.reload();
  };
  const updatePemeriksaan = async () => {
    const response = await getPemeriksaanById(id);
    if (response) {
      setPemeriksaan(response);
    }
  };
  useEffect(() => {
    updatePemeriksaan();
  }, []);
  return (
    <div className="flex gap-x-2">
      {!pemeriksaan?.dibayar ? (
        <AlertDialog>
          <AlertDialogTrigger className="bg-green-500 rounded p-2 text-white">
            Tandai Sudah Bayar
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
              <AlertDialogDescription>
                Pastikan pasien telah benar benar membayar
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={setToPayed}
                className="hover:bg-destructive"
              >
                Tandai Sudah Bayar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <AlertDialog>
          <AlertDialogTrigger className="bg-destructive rounded p-2 text-white">
            Tandai Belum dibayar
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
              <AlertDialogDescription>
                Pastikan pasien telah benar benar belum membayar
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={setToUnpayed}
                className="hover:bg-destructive"
              >
                Tandai Belum dibayar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <Link href={`/dashboard/pemeriksaan/${id}`} className={buttonVariants()}>
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
              onClick={() => deletePemeriksaanAction()}
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

export default PemeriksaanTableAction;
