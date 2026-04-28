# ProyectoAdistec

Aplicacion full stack para explorar equipos de futbol a partir de dos fuentes:

- Datos locales en un archivo JSON
- Datos externos desde TheSportsDB (API publica)

Permite buscar, filtrar y ordenar equipos, y muestra un resumen estadistico en pantalla.

## Requisitos

- Node.js 18 o superior
- npm

## Configuracion de variables de entorno

### Backend (archivo backend/.env)

Variables usadas:

- PORT=3000
- SPORTSDB_BASE_URL=https://www.thesportsdb.com/api/v1/json
- SPORTSDB_API_KEY=123

### Frontend (archivo frontend/.env)

- VITE_API_BASE_URL=http://localhost:3000

## Como ejecutar el proyecto

1. Instalar dependencias

Backend:

npm install --prefix backend

Frontend:

npm install --prefix frontend

2. Levantar backend

node backend/src/app.js

3. Levantar frontend (en otra terminal)

npm --prefix frontend run dev

4. (Opcional) Ejecutar tests backend

npm --prefix backend test

5. Abrir en navegador

http://localhost:5173

## Endpoints principales

Base URL backend: http://localhost:3000

- GET /api/health
	- Estado del servicio

- GET /api/teams
	- Lista de equipos JSON
	- Query params disponibles: search, country, league, sortBy, order

- GET /api/teams/:id
	- Devuelve un equipo JSON por id

- GET /api/teams/external
	- Lista equipos desde TheSportsDB
	- Query params: country, sport, search

- GET /api/teams/countries
	- Lista de paises combinada (local + externa)

- GET /api/stats
	- Estadisticas generales de equipos JSON

## Ejemplos rapidos

- Equipos locales de Argentina ordenados por nombre:
	- /api/teams?country=argentina&sortBy=name&order=asc

- Equipos externos por pais:
	- /api/teams/external?country=Argentina&sport=Soccer

- Buscar externos por nombre:
	- /api/teams/external?search=Boca