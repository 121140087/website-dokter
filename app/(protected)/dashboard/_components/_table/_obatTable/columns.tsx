"use client";

import { Button } from "@/components/ui/button";
import { Obat } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

export type ObatTableDef = {
  id: string;
  nama: string;
  stok: string;
};

export const obatColumns: ColumnDef<Obat>[] = [
  {
    accessorKey: "nama",
    header: "Nama",
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
    accessorKey: "id",
    cell: ({ row }) => {
      return (
        <Link href={"/dashboard/obat/" + row.getValue("id")}>
          <Button>Buka</Button>
        </Link>
      );
    },
  },
];
