import { http } from "@/lib/http";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Badge, BadgeProps } from "../ui/badge";

dayjs.extend(relativeTime);

export async function Holidays() {
  const year = new Date().getFullYear();
  const { data: holidays } = await http.get(`/feriados/${year}`);

  const { upcoming, past } = holidays.reduce(
    (acc: { upcoming: Holiday[]; past: Holiday[] }, holiday: Holiday) => {
      if (dayjs().isBefore(dayjs(holiday.fecha))) {
        acc.upcoming.push(holiday);
      } else {
        acc.past.push(holiday);
      }
      return acc;
    },
    {
      upcoming: [] as Holiday[],
      past: [] as Holiday[],
    }
  );

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h3 className="text-sm">
        {holidays.length} feriados para el {year}
      </h3>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <h4 className="col-span-full text-lg font-bold">Próximos Feriados</h4>
        {upcoming.map((holiday: Holiday) => (
          <HolidayCard
            key={`upcoming-holiday-${holiday.fecha}`}
            holiday={holiday}
          />
        ))}
        <h4 className="col-span-full text-lg font-bold">Feriados Pasados</h4>
        {past.map((holiday: Holiday) => (
          <HolidayCard
            key={`past-holiday-${holiday.fecha}`}
            holiday={holiday}
          />
        ))}
      </div>
    </main>
  );
}

enum HolidayType {
  puente = "puente",
  inamovible = "inamovible",
  trasladable = "trasladable",
}

function HolidayCard({ holiday }: { holiday: Holiday }) {
  const badgeVariant = {
    [HolidayType.puente]: "outline",
    [HolidayType.inamovible]: "destructive",
    [HolidayType.trasladable]: "secondary",
  };
  return (
    <Card
      key={`holiday-${holiday.fecha}`}
      className="rounded-xl flex flex-col justify-between h-full bg-muted/50"
    >
      <CardHeader>
        <CardTitle className="text-xs">{holiday.fecha}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-bold">{holiday.nombre}</p>
        <p>{dayjs().to(dayjs(holiday.fecha))}</p>
      </CardContent>
      <CardFooter>
        <Badge
          variant={
            badgeVariant[holiday.tipo as HolidayType] as BadgeProps["variant"]
          }
        >
          {holiday.tipo}
        </Badge>
      </CardFooter>
    </Card>
  );
}
