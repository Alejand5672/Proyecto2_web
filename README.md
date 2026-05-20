## Luis Alejandro Hernández Márquez (241424)
## Sistemas y tecnologías web - Proyecto 2
## Prof. Ludwing Cano

# Viajes y Lugares - Fase 1

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
- CRUD completo usando LocalStorage.
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

En esta fase el frontend y el backend son independientes.


# Captura prueba fase 1
## Captura prueba fase 1

![Mis primeras pruebas](./capturasPrueba/primeraFase.png)