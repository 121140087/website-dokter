"use client";
import { Button } from "@/components/ui/button";
import { Antrian } from "@/lib/definitions/definitions";
import { StatusAntrian } from "@/lib/definitions/enum";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
export type AntrianTableDef = {
  no: number;
  nama: string;
  keluhan: string;
  status: StatusAntrian;
};
export const antrianColumns: ColumnDef<AntrianTableDef>[] = [
  {
    accessorKey: "no",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
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
    accessorKey: "keluhan",
    header: "Keluhan",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
