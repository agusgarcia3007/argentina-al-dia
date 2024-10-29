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
import { MonthlyChart } from "./monthly-chart";
import { Table } from "./table";

export async function MonthlyInflation() {
  const { data: inflation } = await http.get("/finanzas/indices/inflacion");
  const lastValue = inflation[inflation.length - 1];

  const lastMonth = new Intl.DateTimeFormat("es-ES", { month: "long" }).format(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );

  const lastYearInflation = inflation.filter((val: CommonResponse) =>
    val.fecha.includes(new Date().getFullYear().toString())
  );

  return (
    <PageWrapper>
      <h4 className="text-lg font-bold">Ultimo valor</h4>
      <PageGallery>
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Índice de inflación del mes de {lastMonth}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-xl">{lastValue.valor}%</p>
          </CardContent>
          <CardFooter>
            Datos actualizados el {lastValue.fecha}{" "}
            <p className="text-xs ml-0.5 text-muted-foreground">
              ({relativeTime(lastValue.fecha)})
            </p>
          </CardFooter>
        </Card>
      </PageGallery>

      <h4 className="text-lg font-bold">
        Variaciones del {new Date().getFullYear()}
      </h4>
      <div className="flex gap-4">
        <div className="w-full sm:w-1/2">
          <MonthlyChart data={lastYearInflation} />
        </div>
        <div className="w-full sm:w-1/2">
          <Table data={lastYearInflation} />
        </div>
      </div>
    </PageWrapper>
  );
}
