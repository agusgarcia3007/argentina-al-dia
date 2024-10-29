type Holiday = {
  nombre: string;
  fecha: string;
  tipo: string;
};

type CommonResponse = {
  fecha: string;
  valor: number;
};

type PageCode =
  | "feriados"
  | "eventos-presidenciales"
  | "inflacion-mensual"
  | "inflacion-interanual"
  | "riesgo"
  | "uva"
  | "tasa-interes";
