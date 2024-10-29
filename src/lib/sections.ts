import { Calendar, ChartColumn, ClipboardList, Tickets } from "lucide-react";

export const sections = {
  navMain: [
    {
      id: "feriados",
      title: "Feriados",
      url: "/feriados",
      icon: Calendar,
    },
    {
      id: "eventos-presidenciales",
      title: "Eventos presidenciales",
      url: "/eventos-presidenciales",
      icon: Tickets,
    },
    {
      title: "Índices",
      icon: ChartColumn,
      items: [
        {
          id: "inflacion-mensual",
          title: "Inflación mensual",
          url: "/inflacion/mensual",
        },
        {
          id: "inflacion-interanual",
          title: "Inflación interanual",
          url: "/inflacion/interanual",
        },
        {
          id: "riesgo",
          title: "Riesgo país",
          url: "/riesgo-pais",
        },
        {
          id: "uva",
          title: "Índices UVA",
          url: "/indices-uva",
        },
      ],
    },
    {
      title: "Tasas",
      icon: ClipboardList,
      items: [
        {
          id: "tasa-interes",
          title: "Plazo fijo",
          url: "/plazos-fijos",
        },
      ],
    },
  ],
};
