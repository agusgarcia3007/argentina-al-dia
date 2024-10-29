import { http } from "@/lib/http";

import { PageGallery, PageWrapper } from "../../page-wrapper";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { relativeTime } from "@/lib/utils";
import { YearlyChart } from "./yearly-chart";
import { Table } from "./table";

export async function YearlyInflation() {
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
    <PageWrapper>
      <h4 className="text-lg font-bold">Ultimo valor</h4>
      <PageGallery>
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Índice de inflación del último año</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-xl">{lastValue.valor}%</p>
          </CardContent>
          <CardFooter>Últimos datos: {lastValue.fecha} </CardFooter>
        </Card>
      </PageGallery>

      <h4 className="text-lg font-bold">
        Variaciones de la inflación interanual
      </h4>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2">
          <YearlyChart data={annualInflation} />
        </div>
        <div className="w-full sm:w-1/2">
          <Table data={annualInflation} />
        </div>
      </div>
    </PageWrapper>
  );
}
