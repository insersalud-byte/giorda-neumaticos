/**
 * Tipos del dominio Giorda.
 * Estos modelan lo que esperamos del sistema interno via API.
 * Cuando se conecte el sistema real, mantener este contrato.
 */

export type Marca =
  | "Sunny"
  | "GT Radial"
  | "Giti"
  | "Wanli"
  | "Champiro"
  | "Maxmiler"
  | "Xbri"
  | "Ovation";

export type TipoUso = "auto" | "camioneta" | "suv" | "utilitario" | "moto";

export interface MedidaNeumatico {
  ancho: number;     // ej: 185
  perfil: number;    // ej: 65
  rodado: number;    // ej: 15
}

export interface Neumatico {
  id: string;
  sku: string;
  marca: Marca;
  modelo: string;
  medida: MedidaNeumatico;
  medidaTexto: string;     // "185/65 R15 88H"
  indiceCarga?: string;    // "88"
  indiceVelocidad?: string;// "H"
  tipoUso: TipoUso[];
  precioBase: number;      // ARS, precio lista
  precioContado: number;   // ARS, precio efectivo/transferencia
  cuotasSinInteres: number;// ej: 6
  stock: number;
  imagenUrl?: string;
  oferta?: {
    activa: boolean;
    porcentajeDescuento: number;
    precioOferta: number;
  };
}

export type ServicioId =
  | "colocacion"
  | "balanceo"
  | "alineacion"
  | "tren-delantero"
  | "frenos";

export interface Servicio {
  id: ServicioId;
  nombre: string;
  descripcionCorta: string;
  precioDesde: number;
  duracionMinutos: number;
  permiteTurnoOnline: boolean;
}

export interface Turno {
  id?: string;
  servicioId: ServicioId;
  fechaHora: string;     // ISO 8601
  cliente: {
    nombre: string;
    telefono: string;
    email?: string;
  };
  vehiculo: {
    patente: string;
    marca: string;
    modelo: string;
    anio?: number;
  };
  notas?: string;
  estado: "pendiente" | "confirmado" | "completado" | "cancelado";
}

export interface ItemCarrito {
  neumaticoId: string;
  cantidad: number;
  precioUnitario: number; // precio contado al momento de agregar
}

export interface Orden {
  id?: string;
  items: ItemCarrito[];
  total: number;
  cliente: {
    nombre: string;
    telefono: string;
    email: string;
    dni?: string;
  };
  envio: {
    modo: "retiro" | "envio";
    direccion?: string;
    localidad?: string;
    cp?: string;
  };
  pago: {
    metodo: "mercadopago" | "transferencia" | "efectivo";
    estado: "pendiente" | "aprobado" | "rechazado";
    mpPaymentId?: string;
  };
  estado: "pendiente" | "pagada" | "cancelada" | "entregada";
  fechaCreacion: string;
}
