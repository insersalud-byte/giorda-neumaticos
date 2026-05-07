# Giorda Neumáticos — Landing + Ecommerce

Sitio web de Giorda Neumáticos (Córdoba, Argentina). Construido con Next.js 15 + Tailwind. Incluye catálogo con buscador triple, sistema de turnos online, carrito persistente y checkout con Mercado Pago. Se integra con el sistema interno de gestión via API REST y webhooks bidireccionales.

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 |
| Estilos | Tailwind CSS 3 + identidad propia (azul/amarillo) |
| Estado | Zustand con persistencia en localStorage |
| Pagos | Mercado Pago (Checkout Pro) |
| Iconos | Lucide React |
| Hosting recomendado | Vercel |

## Estructura

```
app/
  layout.tsx              # layout global con Navbar + Footer + WhatsApp flotante
  page.tsx                # home con todas las secciones
  catalogo/               # listado con filtros (marca, ancho, perfil, rodado)
  producto/[id]/          # ficha de producto + acciones de carrito
  turnos/                 # flujo en 3 pasos (servicio → fecha → datos)
  carrito/                # vista de carrito persistente
  checkout/               # formulario + selección de pago
  gracias/                # post-compra
  servicios/              # listado de servicios
  marcas/                 # cards de marcas con descripción
  contacto/               # info de contacto
  api/
    turnos/               # POST → crea turno en sistema interno
    checkout/             # POST → crea orden + preferencia MP
    mp-webhook/           # POST ← Mercado Pago notifica cambios de pago
    sync-webhook/         # POST ← sistema interno notifica cambios de stock/precio

components/
  Navbar / Footer / Logo / DogIcon
  WhatsAppFloat           # botón flotante con mensaje contextual por ruta
  Hero + BuscadorTriple   # hero con tabs medida/auto/marca
  TrustBar / ServiciosGrid / MarcasSection / GuiaMedidas
  ProductCard / DestacadosHome / CTAFinal

lib/
  types.ts                # contrato del dominio (Neumatico, Servicio, Turno, Orden)
  api.ts                  # cliente del sistema interno (con fallback a mocks)
  mock-data.ts            # datos de ejemplo + descripción de marcas
  cart-store.ts           # Zustand store del carrito
  utils.ts                # cn(), formatARS(), calcularPrecioContado(), whatsappLink()

scraping-gomerias/        # informe competitivo previo (no se incluye en build)
```

## Setup

### 1. Instalar dependencias

```powershell
npm install
```

### 2. Variables de entorno

Copiá `.env.example` a `.env.local` y completá:

```bash
# Sistema interno de Giorda (la API que vos hiciste)
SISTEMA_API_BASE_URL=https://tu-sistema.example.com/api
SISTEMA_API_KEY=token-secreto-bearer

# Mercado Pago
MP_ACCESS_TOKEN=APP_USR-xxxxxxxx
NEXT_PUBLIC_MP_PUBLIC_KEY=APP_USR-xxxxxxxx

# WhatsApp del local
NEXT_PUBLIC_WHATSAPP_NUMBER=5493512293025

# URL pública (para back_urls de MP y webhooks)
NEXT_PUBLIC_SITE_URL=https://giordaneumaticos.com.ar
```

> Mientras `SISTEMA_API_BASE_URL` esté vacío, la app usa los datos mock de `lib/mock-data.ts` automáticamente. Esto permite desarrollar la web sin depender del sistema.

### 3. Correr en desarrollo

```powershell
npm run dev
```

Abrir http://localhost:3000

### 4. Build de producción

```powershell
npm run build
npm start
```

## Integración con el sistema interno

La web habla con el sistema interno **sólo a través de `lib/api.ts`**. Los endpoints esperados son:

| Método | Path | Descripción |
|---|---|---|
| `GET` | `/neumaticos?marca=&ancho=&perfil=&rodado=` | Lista filtrada de neumáticos |
| `GET` | `/neumaticos/:id` | Detalle de un neumático |
| `GET` | `/servicios` | Lista de servicios |
| `GET` | `/turnos/disponibilidad?servicioId=&desde=&hasta=` | Slots disponibles (ISO 8601) |
| `POST` | `/turnos` | Crear turno (body: `Turno` sin `id` ni `estado`) |
| `POST` | `/ordenes` | Crear orden (body: `Orden` parcial) |

El contrato de tipos está en `lib/types.ts`. Si el sistema usa otros nombres de campos, hay que adaptarlos en el cliente `lib/api.ts` (no en el resto del código).

### Sincronización bidireccional

**Web → Sistema:** se hace por las llamadas HTTP del cliente `lib/api.ts`.

**Sistema → Web:** cuando el sistema cambia precios, stock o ofertas, debe hacer:

```
POST https://giordaneumaticos.com.ar/api/sync-webhook
Authorization: Bearer <SISTEMA_API_KEY>
Content-Type: application/json

{ "tipo": "producto", "id": "sunny-185-65-15" }
```

Tipos válidos: `"producto"` | `"servicio"` | `"todo"`. Esto fuerza la regeneración de las páginas afectadas (Next.js ISR).

### Webhook de Mercado Pago

Configurar en el panel de MP la URL de notificaciones:

```
https://giordaneumaticos.com.ar/api/mp-webhook
```

El endpoint recibe el evento, consulta el detalle del pago a la API de MP y actualiza la orden en el sistema interno.

## Despliegue en Vercel

1. `git init && git add . && git commit -m "init"`
2. Crear repo en GitHub y push.
3. En Vercel: importar el repo, agregar las variables de entorno.
4. Configurar dominio personalizado (`giordaneumaticos.com.ar`).
5. En Mercado Pago: configurar webhook → `https://giordaneumaticos.com.ar/api/mp-webhook`.

## Identidad visual

- **Azul:** `#0B3D91` (giorda-blue)
- **Amarillo:** `#FFCB05` (giorda-yellow)
- **Tipografías:** Inter (texto) + Plus Jakarta Sans (display)
- **Mascota:** perro inline en SVG en `components/Logo.tsx`. Reemplazar con el logo real del cliente cuando esté disponible.

## TODO / próximos pasos

- [ ] Reemplazar SVGs placeholder de neumáticos con fotos reales
- [ ] Reemplazar logo SVG con el logo real de Giorda
- [ ] Conectar `lib/api.ts` con el sistema interno real
- [ ] Configurar Google Analytics / Meta Pixel
- [ ] Embed de Google Maps en `/contacto`
- [ ] Página de admin para ver órdenes/turnos (opcional, si no lo cubre el sistema interno)
- [ ] Validación de firma del webhook de MP (HMAC con secret)
- [ ] Tests E2E con Playwright para los flujos críticos (compra y turno)
