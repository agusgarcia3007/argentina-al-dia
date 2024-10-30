"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

const columns: ColumnDef<CommonResponse>[] = [
  {
    accessorKey: "fecha",
    header: "Fecha",
    cell: ({ row }) => {
      return dayjs(row.getValue("fecha")).format("DD/MM/YYYY");
    },
  },
  {
    accessorKey: "valor",
    header: "Valor",
    cell: ({ row }) => {
      return <Badge>{row.getValue("valor")}</Badge>;
    },
  },
];

export function Table({ data }: { data: CommonResponse[] }) {
  return (
    <Card className="px-2">
      <DataTable data={data} columns={columns} />
    </Card>
  );
}