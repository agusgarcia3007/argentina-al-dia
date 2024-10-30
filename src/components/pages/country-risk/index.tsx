import { http } from "@/lib/http";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageGallery, PageWrapper } from "@/components/pages/page-wrapper";
import { MonthlyChart } from "./history-chart";
import { Table } from "./table";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import dayjs from "dayjs";

export async function CountryRisk() {
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
  const { data: countryRisk } = await http.get(
    "/finanzas/indices/riesgo-pais/ultimo"
  );

  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle>Riesgo país</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-bold text-xl">{countryRisk.valor}</p>
      </CardContent>
      <CardFooter>
        Datos actualizados el {dayjs(countryRisk.fecha).format("DD/MM/YYYY")}
      </CardFooter>
    </Card>
  );
}

async function Variation() {
  const { data: countryRisk } = await http.get("/finanzas/indices/riesgo-pais");

  const annualCountryRisk = countryRisk
    .filter((entry: CommonResponse) => entry.fecha.endsWith("-12-31"))
    .map((entry: CommonResponse) => ({
      fecha: entry.fecha.slice(0, 4),
      valor: entry.valor,
    }));

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-1/2">
        <MonthlyChart data={annualCountryRisk} />
      </div>
      <div className="w-full sm:w-1/2">
        <Table data={annualCountryRisk} />
      </div>
    </div>
  );
}
