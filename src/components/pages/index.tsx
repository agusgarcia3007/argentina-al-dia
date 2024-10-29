import { ChartColumn, ClipboardList, Tickets } from "lucide-react";
import { Holidays } from "./holidays";
import { MonthlyInflation } from "./inflation/monthly";
import { YearlyInflation } from "./inflation/yearly";

export function Pages({ pageCode }: { pageCode: PageCode }) {
  const pages = {
    feriados: <Holidays />,
    "eventos-presidenciales": <Tickets />,
    "inflacion-mensual": <MonthlyInflation />,
    "inflacion-interanual": <YearlyInflation />,
    riesgo: <ChartColumn />,
    uva: <ChartColumn />,
    "tasa-interes": <ClipboardList />,
  };
  return pages[pageCode];
}
