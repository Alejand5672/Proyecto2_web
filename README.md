# Luis Alejandro Hernández Márquez (241424)
# Sistemas y tecnologias web
# Prof: Ludwing Cano
# Proyecto Final: Viajes y Lugares

## URLs

Proyecto final de Sistemas y tecnologias web.

| Recurso | URL |
| --- | --- |
| Frontend en Vercel | Pendiente de deploy |
| Backend en Render | Pendiente de deploy |
| Health check backend | Pendiente de deploy |

## Autor

| Dato | Informacion |
| --- | --- |
| Nombre | Luis Alejandro Hernandez Marquez |
| Carnet | 241424 |
| Curso | Sistemas y tecnologias web |
| Profesor | Ludwing Cano |
| Semestre | Primer semestre 2026 |

## Tema

La aplicacion es un log de destinos visitados. Permite registrar lugares de viaje con pais, ciudad, estado, categoria, calificacion, dias visitados, tipo de experiencia, notas y estado activo.

## Screenshots

### Modo claro

![Captura fase 1](./capturasPrueba/primeraFase.png)

### Profiler antes de useMemo

![Profiler antes de useMemo](./capturasPrueba/imagenantesMEMO.png)

### Profiler despues de useMemo

![Profiler despues de useMemo](./capturasPrueba/imagenDespuesMEMO.png)

### Analisis de useMemo

Antes de aplicar la optimizacion, escribir en el buscador provocaba que la lista se filtrara y que las tarjetas recibieran funciones nuevas en cada render. Despues de usar `useMemo`, `useCallback` y `React.memo`, los calculos derivados se recalculan solo cuando cambian sus dependencias reales, y las tarjetas que conservan las mismas props pueden dejar de re-renderizarse.

### Capturas pendientes antes del deploy

- Captura actualizada en modo claro.
- Captura actualizada en modo oscuro.
- Captura con las graficas visibles desde la version final.

## Stack tecnologico

| Capa | Tecnologia | Version |
| --- | --- | --- |
| Frontend | React | ^19.2.6 |
| Frontend | React DOM | ^19.2.6 |
| Frontend | Vite | ^8.0.12 |
| Frontend | Recharts | ^2.15.4 |
| Frontend | ESLint | ^10.3.0 |
| Backend | Node.js | Recomendado 20+ |
| Backend | Express | ^5.0.0 |
| Backend | SQLite | sqlite3 ^5.1.7 |
| Backend | CORS | ^2.8.5 |
| Backend | dotenv | ^17.0.0 |

## Estructura

```text
proyecto2_web/
  frontend/
    src/
      components/
      context/
      hooks/
      reducers/
      services/
      utils/
  backend/
    src/
      config/
      db/
      repositories/
      routes/
      utils/
```

## Como correr localmente

### Backend

```bash
cd backend
npm install
npm start
```

El backend corre por defecto en:

```text
http://localhost:3000
```

Endpoint de prueba:

```text
GET http://localhost:3000/api/health
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend corre por defecto en:

```text
http://localhost:5173
```

### Variables de entorno

Frontend:

```env
VITE_API_URL=http://localhost:3000
```

Backend:

```env
PORT=3000
FRONTEND_URL=http://localhost:5173
DATABASE_PATH=./data/viajes_lugares.sqlite
```


## Mis primeros Items (F1)

Los primeros destinos reales del proyecto son:

| Destino | Categoria | Pais | Dias | Experiencia |
| --- | --- | --- | ---: | --- |
| Cancun | Playa | Mexico | 4 | Relajacion |
| Ciudad de Mexico | Ciudad | Mexico | 3 | Cultural |
| Chichen Itza | Historico | Mexico | 1 | Historia |

Estos items viven en `frontend/src/services/destinosIniciales.js` para LocalStorage y en `backend/src/db/seedData.js` para SQLite.

## Fase 1 - CRUD y Backend

### Frontend

- Proyecto creado con React + Vite.
- CRUD completo de destinos.
- `FormularioItem.jsx` usa inputs controlados con `useState`.
- `ListaItems.jsx` renderiza destinos con `.map()`.
- `ItemCard.jsx` muestra cada destino con acciones para editar, activar/desactivar y eliminar.
- Persistencia local con LocalStorage.
- Modelo con `id`, `nombre`, `categoriaId`, `estado`, `atributos`, `activo`, calificacion y datos propios del tema.

### Backend

- API con Express.
- Base de datos SQLite.
- Tabla `items`.
- Tabla `registros`.
- Seed inicial para que la API no arranque vacia.
- `DELETE /api/items/:id` archiva con `activo = 0`.

Endpoints:

```text
GET    /api/health
GET    /api/items
POST   /api/items
PUT    /api/items/:id
DELETE /api/items/:id
POST   /api/items/:id/registro
```

## Fase 2 - Context, Refs y Tema

### StorageContext

`StorageContext` abstrae el origen de datos. Los componentes no deciden si usan API o LocalStorage; solo llaman:

```text
modo
setModo(modo)
obtenerItems()
guardarItem(item)
eliminarItem(id)
```

El selector de la interfaz permite alternar entre modo `local` y modo `api`.

### ThemeContext

`ThemeContext` maneja tema claro y oscuro con:

```js
document.body.setAttribute('data-theme', tema)
```

El tema persiste en LocalStorage y los colores principales usan variables CSS.

### useRef

| Uso | Archivo | Descripcion |
| --- | --- | --- |
| Focus del input | `frontend/src/App.jsx` | Enfoca el campo nombre despues de guardar y con `Ctrl + N`. |
| Scroll automatico | `frontend/src/App.jsx` | Hace scroll al ultimo destino agregado. |

### Atajos

| Atajo | Accion |
| --- | --- |
| Ctrl + N | Enfoca el input de nombre |
| T | Alterna tema claro/oscuro |

## Categorias personalizadas

| Categoria | Color |
| --- | --- |
| Playa | `#0EA5E9` |
| Naturaleza | `#16A34A` |
| Historico | `#A855F7` |
| Gastronomico | `#F97316` |
| Ciudad | `#475569` |

## Mi paleta (F2)

### Tema claro

`#f8faf7` Fondo principal. Mantiene la aplicacion luminosa sin verse plana y permite que las tarjetas blancas respiren.

`#ffffff` Superficie. Se usa en formularios, resumen y tarjetas para priorizar lectura y separar contenido del fondo.

`#182126` Texto base. Es un tono oscuro con matiz verde, mas amable que negro puro y legible en textos largos.

`#102018` Titulos. Da peso visual a nombres de destinos y encabezados sin depender solo del tamano.

`#557168` Texto secundario. Funciona para metadatos, labels y detalles que no deben competir con el contenido principal.

`#245f4d` Acento. Conecta con la idea de viajes, naturaleza y rutas; se usa en botones y controles activos.

### Tema oscuro

`#121212` Fondo principal. Reduce fatiga visual y evita que la interfaz se vuelva demasiado azul o saturada.

`#1d2421` Superficie. Separa tarjetas y formularios del fondo oscuro sin sombras pesadas.

`#f0f0f0` Texto base. Ofrece lectura clara sin usar blanco puro en todo el texto.

`#ffffff` Titulos. Reserva el contraste maximo para encabezados y nombres importantes.

`#a7b9b1` Texto secundario. Mantiene labels y detalles visibles con menor intensidad visual.

`#74d3ad` Acento. Da energia a botones y switches en modo oscuro y mantiene continuidad con el tema claro.

## Fase 3 - Reducer, Graficas y Optimizacion

### Reducer

El estado principal vive en `frontend/src/reducers/destinosReducer.js`. El reducer es puro y no hace fetch, fechas ni mutaciones directas.

Acciones implementadas:

```text
CARGAR_DESTINOS
AGREGAR_DESTINO
ACTUALIZAR_DESTINO
ARCHIVAR_DESTINO
CAMBIAR_ESTADO_DESTINO
ACTUALIZAR_FILTROS
LIMPIAR_FILTROS
REGISTRAR_ACTIVIDAD_DESTINO
```

### Graficas

Las graficas estan en `frontend/src/components/GraficasDestinos.jsx` y reaccionan a los filtros activos.

| Grafica | Tipo | Que muestra |
| --- | --- | --- |
| Actividad ultimos 7 dias | LineChart | Registros de actividad filtrados por dia |
| Destinos por categoria | PieChart | Distribucion de destinos por categoria |
| Dias visitados por categoria | BarChart | Tiempo invertido en cada tipo de viaje |


### Mi grafica original

Mi grafica original es **Dias visitados por categoria**. La elegi porque en un log de viajes no solo importa cuantos destinos se registran, sino cuanto tiempo se dedica a cada tipo de experiencia: playa, naturaleza, historico, gastronomico o ciudad.

### Mis 3 decisiones tecnicas

1. Estructura del reducer: use nombres de acciones relacionados con viajes y destinos para que el codigo no quedara como una plantilla generica.
2. Accion mas dificil: `CAMBIAR_ESTADO_DESTINO`, porque primero se persiste el cambio en LocalStorage o API y despues se actualiza el reducer con el destino confirmado.
3. Grafica mas compleja: actividad ultimos 7 dias, porque convierte el registro de actividad en una serie temporal y respeta los filtros activos.


## Fase 4 - Custom Hooks y Deploy

### Hooks usados

| Hook | Archivo | Que hace |
| --- | --- | --- |
| `useLocalStorage` | `frontend/src/hooks/useLocalStorage.js` | Sincroniza estado de React con LocalStorage usando `useState` y `useEffect`. |
| `useFetch` | `frontend/src/hooks/useFetch.js` | Ejecuta fetch con `data`, `loading`, `error`, `refetch` y `AbortController`. |
| `useAtajoTeclado` | `frontend/src/hooks/useAtajoTeclado.js` | Registra atajos de teclado con cleanup automatico. |
| `useResumenViajes` | `frontend/src/hooks/useResumenViajes.js` | Calcula destinos filtrados, datos de graficas y total de dias visibles. |

Todos los hooks estan en `src/hooks/`, un hook por archivo, y tienen JSDoc con `@param` y `@returns`.

### Deploy


## Video de demostracion



## Sobre mi

Soy Luis Alejandro Hernandez Marquez. En este proyecto practique como dividir una aplicacion React en componentes, contextos, reducer y hooks propios. La verdad lo que aprendí en todo el curso podría decir que pues todos los temas la verdad, no tenia ni idea de ninguno de los temas que vimos desde el inicio, pero fue un buen curso y el catedratico de una gran ayuda para el aprendizaje.
