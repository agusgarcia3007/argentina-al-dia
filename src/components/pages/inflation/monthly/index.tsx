import { http } from "@/lib/http";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageGallery, PageWrapper } from "../../page-wrapper";
import { MonthlyChart } from "./monthly-chart";
import { Table } from "./table";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import dayjs from "dayjs";

export async function MonthlyInflation() {
  return (
    <PageWrapper>
      <h4 className="text-lg font-bold">Ultimo valor</h4>

      <PageGallery>
        <Suspense fallback={<Skeleton className="rounded-xl w-full h-44" />}>
          <MainCard />
        </Suspense>
      </PageGallery>
      <h4 className="text-lg font-bold">
        Variaciones del {new Date().getFullYear()}
      </h4>

      <Suspense
        fallback={
          <div className="flex flex-col gap-4 sm:flex-row *:rounded-xl *:h-56 *:w-full *:sm:w-1/2">
            <Skeleton />
            <Skeleton />
          </div>
        }
      >
        <Variation />
      </Suspense>
    </PageWrapper>
  );
}

async function MainCard() {
  const { data: inflation } = await http.get("/finanzas/indices/inflacion");
  const lastValue = inflation[inflation.length - 1];
  const lastMonth = new Intl.DateTimeFormat("es-ES", { month: "long" }).format(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );

  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle>Índice de inflación del mes de {lastMonth}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-bold text-xl">{lastValue.valor}%</p>
      </CardContent>
      <CardFooter>
        Datos actualizados el {dayjs(lastValue.fecha).format("DD/MM/YYYY")}{" "}
      </CardFooter>
    </Card>
  );
}

async function Variation() {
  const { data: inflation } = await http.get("/finanzas/indices/inflacion");

  const lastYearInflation = inflation.filter((val: CommonResponse) =>
    val.fecha.includes(new Date().getFullYear().toString())
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-1/2">
        <MonthlyChart data={lastYearInflation} />
      </div>
      <div className="w-full sm:w-1/2">
        <Table data={lastYearInflation} />
      </div>
    </div>
  );
}
