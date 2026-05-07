import type { Neumatico, Servicio } from "./types";
import { calcularPrecioContado } from "./utils";

const make = (n: Omit<Neumatico, "precioContado" | "medidaTexto">): Neumatico => ({
  ...n,
  precioContado: calcularPrecioContado(n.precioBase),
  medidaTexto: `${n.medida.ancho}/${n.medida.perfil} R${n.medida.rodado}${n.indiceCarga ? " " + n.indiceCarga : ""}${n.indiceVelocidad || ""}`
});

export const MOCK_NEUMATICOS: Neumatico[] = [
  make({
    id: "sunny-185-65-15",
    sku: "SUN-1856515",
    marca: "Sunny",
    modelo: "NP226",
    medida: { ancho: 185, perfil: 65, rodado: 15 },
    indiceCarga: "88",
    indiceVelocidad: "H",
    tipoUso: ["auto"],
    precioBase: 92000,
    cuotasSinInteres: 6,
    stock: 12,
    imagenUrl: "/neumaticos/sunny-np226.jpg"
  }),
  make({
    id: "gtradial-195-65-15",
    sku: "GT-1956515",
    marca: "GT Radial",
    modelo: "Champiro Eco",
    medida: { ancho: 195, perfil: 65, rodado: 15 },
    indiceCarga: "91",
    indiceVelocidad: "H",
    tipoUso: ["auto"],
    precioBase: 105000,
    cuotasSinInteres: 6,
    stock: 8,
    imagenUrl: "/neumaticos/gtradial-eco.png"
  }),
  make({
    id: "giti-205-55-16",
    sku: "GIT-2055516",
    marca: "Giti",
    modelo: "GitiComfort F22",
    medida: { ancho: 205, perfil: 55, rodado: 16 },
    indiceCarga: "91",
    indiceVelocidad: "V",
    tipoUso: ["auto"],
    precioBase: 132000,
    cuotasSinInteres: 6,
    stock: 6,
    imagenUrl: "/neumaticos/giti-comfort-f22.webp",
    oferta: { activa: true, porcentajeDescuento: 10, precioOferta: 118800 }
  }),
  make({
    id: "wanli-175-70-13",
    sku: "WAN-1757013",
    marca: "Wanli",
    modelo: "S1088",
    medida: { ancho: 175, perfil: 70, rodado: 13 },
    indiceCarga: "82",
    indiceVelocidad: "T",
    tipoUso: ["auto"],
    precioBase: 78000,
    cuotasSinInteres: 6,
    stock: 15,
    imagenUrl: "/neumaticos/wanli-s1088.jpg"
  }),
  make({
    id: "champiro-225-65-17",
    sku: "CHA-2256517",
    marca: "Champiro",
    modelo: "HPY",
    medida: { ancho: 225, perfil: 65, rodado: 17 },
    indiceCarga: "102",
    indiceVelocidad: "H",
    tipoUso: ["suv", "camioneta"],
    precioBase: 168000,
    cuotasSinInteres: 6,
    stock: 4,
    imagenUrl: "/neumaticos/champiro-hpy.png"
  }),
  make({
    id: "maxmiler-215-75-16",
    sku: "MAX-2157516",
    marca: "Maxmiler",
    modelo: "X-Pro",
    medida: { ancho: 215, perfil: 75, rodado: 16 },
    indiceCarga: "113",
    indiceVelocidad: "R",
    tipoUso: ["camioneta", "utilitario"],
    precioBase: 178000,
    cuotasSinInteres: 6,
    stock: 7,
    imagenUrl: "/neumaticos/maxmiler-pro.jpg"
  }),
  make({
    id: "xbri-265-65-17",
    sku: "XBR-2656517",
    marca: "Xbri",
    modelo: "Force HT",
    medida: { ancho: 265, perfil: 65, rodado: 17 },
    indiceCarga: "112",
    indiceVelocidad: "T",
    tipoUso: ["camioneta", "suv"],
    precioBase: 215000,
    cuotasSinInteres: 6,
    stock: 5,
    imagenUrl: "/neumaticos/xbri-forza-ht2.jpg",
    oferta: { activa: true, porcentajeDescuento: 8, precioOferta: 197800 }
  }),
  make({
    id: "ovation-205-60-16",
    sku: "OVA-2056016",
    marca: "Ovation",
    modelo: "VI-682",
    medida: { ancho: 205, perfil: 60, rodado: 16 },
    indiceCarga: "92",
    indiceVelocidad: "H",
    tipoUso: ["auto"],
    precioBase: 124000,
    cuotasSinInteres: 6,
    stock: 9,
    imagenUrl: "/neumaticos/ovation-vi682.png"
  })
];

export const MOCK_SERVICIOS: Servicio[] = [
  {
    id: "colocacion",
    nombre: "Colocación de neumáticos",
    descripcionCorta: "Montaje, válvula nueva y balanceo electrónico incluidos.",
    precioDesde: 8000,
    duracionMinutos: 45,
    permiteTurnoOnline: true
  },
  {
    id: "balanceo",
    nombre: "Balanceo electrónico",
    descripcionCorta: "Balanceo computarizado por rueda con máquina digital.",
    precioDesde: 5000,
    duracionMinutos: 30,
    permiteTurnoOnline: false
  },
  {
    id: "alineacion",
    nombre: "Alineación 3D",
    descripcionCorta: "Alineación computarizada de las cuatro ruedas.",
    precioDesde: 18000,
    duracionMinutos: 45,
    permiteTurnoOnline: false
  },
  {
    id: "tren-delantero",
    nombre: "Revisión de tren delantero",
    descripcionCorta: "Diagnóstico completo de rótulas, bieletas, parrillas y bujes.",
    precioDesde: 0,
    sinCargo: true,
    duracionMinutos: 60,
    permiteTurnoOnline: true
  },
  {
    id: "frenos",
    nombre: "Revisión de frenos",
    descripcionCorta: "Inspección de pastillas, discos, líquido y cilindros.",
    precioDesde: 0,
    sinCargo: true,
    duracionMinutos: 45,
    permiteTurnoOnline: true
  }
];

export const MARCAS_INFO = [
  {
    nombre: "Sunny",
    descripcion: "Fabricante chino enfocado en uso urbano. Excelente relación calidad/precio para autos compactos y medianos.",
    origen: "China"
  },
  {
    nombre: "GT Radial",
    descripcion: "Marca premium del grupo Giti, con tecnología desarrollada en Alemania. Certificación europea, ideal para uso mixto urbano/ruta.",
    origen: "Indonesia / Alemania"
  },
  {
    nombre: "Giti",
    descripcion: "Uno de los 10 fabricantes de neumáticos más grandes del mundo. Provee como OEM a Volkswagen, Ford y Toyota.",
    origen: "Singapur / China"
  },
  {
    nombre: "Wanli",
    descripcion: "Opción económica y confiable para autos compactos. Buena duración en uso urbano.",
    origen: "China"
  },
  {
    nombre: "Champiro",
    descripcion: "Línea SUV y camioneta del grupo GT Radial. Robustez, agarre en piso mojado y bajo nivel de ruido.",
    origen: "Indonesia"
  },
  {
    nombre: "Maxmiler",
    descripcion: "Especialistas en utilitarios y camionetas de carga. Resistencia y durabilidad para uso intensivo.",
    origen: "Tailandia / Indonesia"
  },
  {
    nombre: "Xbri",
    descripcion: "Marca brasileña en crecimiento. Pensada para 4x4 y SUV — buen comportamiento en caminos mixtos.",
    origen: "Brasil"
  },
  {
    nombre: "Ovation",
    descripcion: "Foco en uso urbano deportivo. Buen agarre y precio competitivo para autos medianos.",
    origen: "China"
  }
];
