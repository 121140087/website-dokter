"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type ObatTableDef = {
  id: string;
  nama: string;
  stok: string;
};

export const obatColumns: ColumnDef<ObatTableDef>[] = [
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
    id: "actions",
    cell: ({ row }) => {
      return <Button>Buka</Button>;
    },
  },
];
