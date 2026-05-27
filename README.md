## Luis Alejandro Hernández Márquez (241424)
## Sistemas y tecnologías web - Proyecto 2
## Prof. Ludwing Cano

# Viajes y Lugares - Fase 1 y 2

Proyecto universitario con frontend en React + Vite y backend en Express.

## Tema

Log de destinos visitados. La aplicacion permite registrar lugares de viaje con pais, ciudad, estado, categoria, calificacion, dias visitados, notas y estado activo.

## Estructura

```text
proyecto2_web/
  frontend/
    src/
      components/
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

## Frontend

- React con Vite.
- JavaScript puro.
- useState con lazy initializer.
- useEffect para sincronizar LocalStorage.
- useContext para StorageContext y ThemeContext.
- useRef para focus del formulario y scroll automatico al ultimo destino agregado.
- CRUD completo usando LocalStorage o API segun el modo activo.
- Tema claro/oscuro persistido en LocalStorage.
- Atajos: Ctrl + N enfoca el nombre y T alterna el tema visual.
- Componentes obligatorios:
  - FormularioItem.jsx
  - ListaItems.jsx
  - ItemCard.jsx

Comandos:

```bash
cd frontend
npm install
npm run dev
npm run build
npm run lint
```

## Backend

- Express.
- SQLite.
- CORS usando FRONTEND_URL desde .env.
- Tablas:
  - items
  - registros

Endpoints:

```text
GET    /api/items
POST   /api/items
PUT    /api/items/:id
DELETE /api/items/:id
POST   /api/items/:id/registro
```

Comandos:

```bash
cd backend
npm install
npm start
```

## Nota importante

En fase 2 el frontend puede trabajar en modo LocalStorage o modo API desde el selector de la interfaz.

## Categorias personalizadas

Las categorias del tema de viajes tienen emoji y color propio:

```text
Playa         #0EA5E9
Naturaleza    #16A34A
Historico     #A855F7
Gastronomico  #F97316
Ciudad        #475569
```

## Mi paleta de colores

### Tema claro

`#f8faf7` Fondo principal.
Este tono verde casi blanco mantiene la aplicacion luminosa sin verse plana. Tambien ayuda a que las tarjetas blancas se separen con suavidad.

`#ffffff` Superficie.
Se usa en formularios, resumen y tarjetas para priorizar lectura. Contrasta con el fondo sin meter ruido visual.

`#182126` Texto base.
Es un tono oscuro con matiz verde, mas amable que negro puro. Mantiene buena legibilidad en textos largos y labels.

`#102018` Titulos.
Da mas peso a nombres de destinos y encabezados. Refuerza jerarquia sin depender solo del tamano de letra.

`#557168` Texto secundario.
Sirve para metadatos como pais, etiquetas y descripciones. Baja la intensidad para que el contenido principal respire.

`#245f4d` Acento.
Conecta con la idea de viajes, naturaleza y rutas. Se usa en botones y controles activos para indicar accion principal.

### Tema oscuro

`#121212` Fondo principal.
Reduce fatiga visual en sesiones largas y mantiene una base neutra. Evita que la interfaz se vea demasiado azul o saturada.

`#1d2421` Superficie.
Separa tarjetas y formularios del fondo oscuro. Conserva profundidad sin usar sombras pesadas.

`#f0f0f0` Texto base.
Ofrece lectura clara sobre fondos oscuros. No es blanco puro, asi que evita brillo excesivo.

`#ffffff` Titulos.
Reserva el contraste maximo para nombres y encabezados. Ayuda a escanear rapidamente cada destino.

`#a7b9b1` Texto secundario.
Mantiene labels y detalles visibles sin competir con el contenido. Su matiz verde conserva continuidad con el tema claro.

`#74d3ad` Acento.
Da energia a botones y switches en modo oscuro. Su luminosidad funciona bien sobre superficies profundas.


# Captura prueba fase 1
## Captura prueba fase 1

![Mis primeras pruebas](./capturasPrueba/primeraFase.png)
