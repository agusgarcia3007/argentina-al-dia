import { http } from "@/lib/http";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import { PageGallery, PageWrapper } from "../../page-wrapper";
import { Table } from "./table";
import { YearlyChart } from "./yearly-chart";
import { Skeleton } from "@/components/ui/skeleton";

export async function YearlyInflation() {
  return (
    <PageWrapper>
      <h4 className="text-lg font-bold">Ultimo valor</h4>
      <PageGallery>
        <Suspense fallback={<Skeleton className="rounded-xl w-full h-44" />}>
          <MainCard />
        </Suspense>
      </PageGallery>

      <h4 className="text-lg font-bold">
        Variaciones de la inflación interanual
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
  const { data: inflation } = await http.get(
    "/finanzas/indices/inflacionInteranual"
  );
  const annualInflation = inflation
    .filter((entry: CommonResponse) => entry.fecha.endsWith("-12-31"))
    .map((entry: CommonResponse) => ({
      fecha: entry.fecha.slice(0, 4),
      valor: entry.valor,
    }));

  const lastValue = annualInflation[annualInflation.length - 1];

  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle>Índice de inflación del último año</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-bold text-xl">{lastValue.valor}%</p>
      </CardContent>
      <CardFooter>Últimos datos:{lastValue.fecha} </CardFooter>
    </Card>
  );
}

async function Variation() {
  const { data: inflation } = await http.get(
    "/finanzas/indices/inflacionInteranual"
  );

  const annualInflation = inflation
    .filter((entry: CommonResponse) => entry.fecha.endsWith("-12-31"))
    .map((entry: CommonResponse) => ({
      fecha: entry.fecha.slice(0, 4),
      valor: entry.valor,
    }));

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-1/2">
        <YearlyChart data={annualInflation} />
      </div>
      <div className="w-full sm:w-1/2">
        <Table data={annualInflation} />
      </div>
    </div>
  );
}
