import { Button } from "@/components/ui/button";
import { Obat } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const obatColumns: ColumnDef<Obat>[] = [
  {
    accessorKey: "nama",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "golongan",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Golongan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "stok",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stok
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "harga",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Harga
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "action",
    header: "Aksi",
    cell: ({ column }) => {
      return (
        <div className="flex gap-x-2">
          <Button>Edit</Button>
          <Button variant={"destructive"}>Delete</Button>
        </div>
      );
    },
  },
];
