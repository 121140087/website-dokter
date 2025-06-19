"use client";
import { Button } from "@/components/ui/button";
import { Antrian, Jadwal } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import AntrianAksi from "./_components/AntrianAksi";
export const pasienAntrianColumns: ColumnDef<Antrian>[] = [
  {
    accessorKey: "noAntrian",
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
    accessorKey: "statusAntrian",
    header: "Status",
  },
  {
    accessorKey: "jadwal",
    header: "Tanggal",
    cell: ({ row }) => {
      const jadwal = row.getValue("jadwal") as Jadwal;
      const tanggal = new Date(jadwal.tanggal);
      return format(tanggal, "MMM dd, yyyy");
    },
  },
  {
    accessorKey: "id",
    header: "Aksi",
    cell: ({ row }) => {
      return <AntrianAksi id={row.getValue("id")} />;
    },
  },
];
