"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import * as XLSX from "xlsx";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData & { createdAt: Date }, TValue>[];
  data: (TData & { createdAt: Date })[];
  title: string;
  searchKey?: string;
  defaultFilter?: string;
  onFilterChange?: (
    value: string,
    data: (TData & { createdAt: Date })[]
  ) => void;
  customFilter?: (value: string) => (TData & {
    createdAt: Date;
  })[];
}
export function DataTable<TData, TValue>({
  columns,
  data,
  title,
  searchKey = "nama",
  defaultFilter = "semua",
  onFilterChange,
  customFilter,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rangeFilter, setRangeFilter] = React.useState(defaultFilter);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const filteredData = React.useMemo(() => {
    const today = new Date();
    if (customFilter) {
      return customFilter(rangeFilter);
    }
    return data.filter((item) => {
      const createdAt = new Date(item.createdAt);

      switch (rangeFilter) {
        case "harian":
          return createdAt.toDateString() === today.toDateString();

        case "mingguan": {
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          return createdAt >= startOfWeek && createdAt <= endOfWeek;
        }

        case "bulanan":
          return (
            createdAt.getFullYear() === today.getFullYear() &&
            createdAt.getMonth() === today.getMonth()
          );

        case "tahunan":
          return createdAt.getFullYear() === today.getFullYear();

        case "semua":
        default:
          return true;
      }
    });
  }, [data, rangeFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      sorting,
      columnFilters,
    },
  });
  const handleExport = () => {
    const formattedData = filteredData.map((item) => {
      const newItem = {
        ...item,
        tanggal: new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }).format(new Date(item.createdAt)),
      };

      if ("updatedAt" in newItem) {
        delete (newItem as any).updatedAt;
      }
      if ("createdAt" in newItem) {
        delete (newItem as any).createdAt;
      }

      return newItem;
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, `${title}.xlsx`);
  };

  return (
    <div className="rounded-md border p-4 w-full">
      <h2 className="font-bold text-2xl">{title}</h2>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Search"
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div>
          <Button variant="outline" onClick={handleExport}>
            Export ke Excel
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {rangeFilter} <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Pilih durasi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={rangeFilter}
                onValueChange={(value) => {
                  setRangeFilter(value);
                  if (onFilterChange) onFilterChange(value, filteredData);
                }}
              >
                <DropdownMenuRadioItem value="harian">
                  Harian
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="mingguan">
                  Mingguan
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bulanan">
                  Bulanan
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="tahunan">
                  Tahunan
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="semua">
                  Semua
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
