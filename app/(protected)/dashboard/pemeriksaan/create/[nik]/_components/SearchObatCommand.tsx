import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Obat } from "@prisma/client";
import { Check } from "lucide-react";
import { useState } from "react";

export function DialogCommandObat({
  obats,
  selected,
  onChange,
}: {
  obats: Obat[];
  selected?: Obat;
  onChange: (obat: Obat) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState<Obat[]>(obats);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          {selected ? selected.nama : "Pilih Obat"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogTitle>Pilih Obat</DialogTitle>
        <Command>
          <CommandInput
            placeholder="Cari obat..."
            onValueChange={(val) => {
              setQuery(val);
              setFiltered(
                obats.filter((obat) =>
                  obat.nama.toLowerCase().includes(val.toLowerCase())
                )
              );
            }}
            autoFocus
          />
          <CommandList>
            <CommandEmpty>Tidak ditemukan</CommandEmpty>

            {filtered.map((obat) => (
              <CommandItem
                key={obat.id}
                value={obat.nama}
                onSelect={() => {
                  onChange(obat);
                  setOpen(false);
                  setQuery("");
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected?.id === obat.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {obat.nama}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
        <DialogClose asChild>
          <Button variant="outline" className="mt-4 w-full">
            Tutup
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
