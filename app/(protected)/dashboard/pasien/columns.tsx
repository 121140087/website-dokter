"use client";
import { Button } from "@/components/ui/button";
import { Antrian } from "@/lib/definitions/definitions";
import { StatusAntrian } from "@/lib/definitions/enum";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { AntrianTableDef } from "../_antrianTable/columns";
export const pasienAntrianColumns: ColumnDef<AntrianTableDef>[] = [
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
  {
    id: "aksi",
    header: "Aksi",
    cell: ({ column }) => {
      return (
        <div className="flex flex-col gap-y-2">
          <Button>Edit</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      );
    },
  },
];
