"use client";
import { Badge } from "@/components/ui/badge"; // pastikan komponen Badge tersedia
import { Button } from "@/components/ui/button";
import { Obat } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

export const obatColumns: ColumnDef<Obat>[] = [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "stok",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Stok
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const stok = parseInt(row.getValue("stok"));
      if (stok <= 0) {
        return <Badge variant="destructive">Habis</Badge>;
      } else if (stok <= 10) {
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-500 text-white">
            Hampir Habis
          </Badge>
        );
      } else {
        return (
          <Badge className="bg-green-500 hover:bg-green-500 text-white">
            {stok}
          </Badge>
        );
      }
    },
  },
  {
    accessorKey: "id",
    cell: ({ row }) => (
      <Link href={`/dashboard/obat/${row.getValue("id")}`}>
        <Button>Buka</Button>
      </Link>
    ),
  },
];
