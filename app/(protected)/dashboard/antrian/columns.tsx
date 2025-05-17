"use client";
import { Button } from "@/components/ui/button";
import { StatusAntrian } from "@/lib/definitions/enum";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { AntrianTableDef } from "../_components/_table/_antrianTable/columns";
import { Antrian, Jadwal } from "@prisma/client";
import AntrianAksi from "./_components/AntrianAksi";
import { format } from "date-fns";
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
      return format(tanggal,"MMM dd, yyyy")
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
