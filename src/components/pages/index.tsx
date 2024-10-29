import { ChartColumn, ClipboardList, Tickets } from "lucide-react";
import { Holidays } from "./holidays";

export function Pages({ pageCode }: { pageCode: PageCode }) {
  const pages = {
    feriados: <Holidays />,
    "eventos-presidenciales": <Tickets />,
    "inflacion-mensual": <ChartColumn />,
    "inflacion-interanual": <ChartColumn />,
    riesgo: <ChartColumn />,
    uva: <ChartColumn />,
    "tasa-interes": <ClipboardList />,
  };
  return pages[pageCode];
}
