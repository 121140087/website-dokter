import { Obat } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { getObats } from "../../../obat/_actions/getObats";

const ResepForm = ({
  onResepChange,
  resep,
}: {
  onResepChange: (resep: { obat: Obat; jumlah: number }[]) => void;
  resep: { obat: Obat; jumlah: number }[];
}) => {
  const [obats, setObats] = useState<Obat[]>([]);
  const [jumlahObat, setJumlahObat] = useState<number | undefined>();
  const [selectedObat, setSelectedObat] = useState<Obat | undefined>();
  const updateObat = async () => {
    const response = await getObats();
    setObats(response);
  };
  const tambahObat = () => {
    if (selectedObat && jumlahObat) {
      if (selectedObat.stok < jumlahObat) {
        toast("Stok obat hanya " + selectedObat.stok);
        return;
      }
      const selectedObatIndex = resep.findIndex(
        (r) => r.obat.id === selectedObat.id
      );
      if (selectedObatIndex >= 0) {
        if (resep[selectedObatIndex].jumlah + jumlahObat > selectedObat.stok) {
          toast("Stok obat hanya " + selectedObat.stok);
          return;
        }
        resep[selectedObatIndex] = {
          jumlah: resep[selectedObatIndex].jumlah + jumlahObat,
          obat: resep[selectedObatIndex].obat,
        };
        onResepChange(resep);
      } else {
        onResepChange([
          ...resep,
          {
            obat: selectedObat,
            jumlah: jumlahObat,
          },
        ]);
      }
      setJumlahObat(undefined);
      setSelectedObat(undefined);
    }
  };
  const deleteObat = (id: string) => {
    const newResep = resep.filter((obat) => obat.obat.id != id);
    onResepChange(newResep);
  };
  useEffect(() => {
    updateObat();
  }, []);
  return (
    <div className="rounded p-4 border h-fit w-full flex flex-col gap-y-4">
      <h2>Resep</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Jumlah</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resep.map((r, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{r.obat.nama}</TableCell>
                <TableCell>{r.jumlah}</TableCell>
                <TableCell className="flex gap-x-2">
                  <Button
                    variant={"destructive"}
                    onClick={() => deleteObat(r.obat.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Tambahkan Obat</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Menambahkan Obat</DialogTitle>
          <div className="flex flex-col gap-y-4">
            <Select
              onValueChange={(value) => {
                setSelectedObat(obats.find((val) => val.id === value));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Obat" />
              </SelectTrigger>
              <SelectContent>
                {obats.map((obat) => {
                  return (
                    <SelectItem value={obat.id} key={obat.id}>
                      {obat.nama}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full py-2 px-4 border rounded-lg">
                Stok <b>{selectedObat?.stok}</b>
              </div>
              <div className="w-full py-2 px-4 border rounded-lg">
                Harga <b>Rp.{selectedObat?.harga}</b>
              </div>
              <div className="w-full col-span-2 py-2 px-4 border rounded-lg">
                Golongan <b>{selectedObat?.golongan}</b>
              </div>
              <div className="w-full col-span-2 py-2 px-4 border rounded-lg">
                Deskripsi <b>{selectedObat?.deskripsi}</b>
              </div>
            </div>
            <Input
              placeholder="Jumlah"
              type="number"
              onChange={(e) => {
                e.preventDefault();
                setJumlahObat(Number(e.target.value));
              }}
            />
            <DialogClose asChild>
              <Button onClick={tambahObat} type="button">
                Tambahkan
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResepForm;
