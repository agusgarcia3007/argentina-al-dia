import { ModeToggle } from "@/components/mode-toggle";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { Calendar, ChartColumn, ClipboardList, Tickets } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const cards = [
    {
      title: "Fechas importantes",
      icon: Calendar,
      content: "Feriados en Argentina",
      url: "/feriados",
      footer: `Año ${new Date().getFullYear()}`,
    },
    {
      title: "Eventos presidenciales",
      icon: Tickets,
      content: "Eventos presidenciales",
      url: "/eventos%20presidenciales",
      footer: "Elecciones y eventos electorales",
    },
    {
      title: "Índices",
      icon: ChartColumn,
      content: "Inflación y riesgo",
      url: "#",
      footer: "Inflación y riesgo",
    },
    {
      title: "Tasas",
      icon: ClipboardList,
      content: "Tasas de interés",
      url: "#",
      footer: "Plazos",
    },
  ];

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <ModeToggle />
        </div>
      </header>
      <div className="px-4">
        <span className="flex flex-col">
          <h1 className="text-4xl">Argentina al día</h1>
          <p className="text-muted-foreground">Datos públicos en tiempo real</p>
        </span>
        <main className="grid pb-4 w-full grid-cols-1 gap-4 mt-4 sm:mt-8 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Link href={card.url} key={card.title}>
              <Card className="group hover:border-primary hover:shadow-lg h-full flex flex-col justify-between transition-all ease-in-out">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </CardTitle>
                  <card.icon className="h-4 w-4 mt-0" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.content}</div>
                </CardContent>
                <CardFooter>
                  <p className="pt-1 text-xs text-muted-foreground">
                    {card.footer}
                  </p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </main>
      </div>
    </>
  );
}
