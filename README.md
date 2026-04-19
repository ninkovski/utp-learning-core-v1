# Mini LMS Backend

Base técnica del proyecto para la prueba UTP.

## Estado actual
- Fase: `feature/1_foundation`
- Stack base: Node.js + TypeScript + Express
- Incluye: lint, tests, manejo central de errores, healthcheck

## Requisitos
- Node.js 20+
- npm 10+

## Instalación
En PowerShell con restricción de scripts, usar `npm.cmd`:

1. `npm.cmd install`
2. `npm.cmd run dev`

## Scripts
- `npm.cmd run dev` → modo desarrollo
- `npm.cmd run build` → compila TypeScript a `dist/`
- `npm.cmd run start` → ejecuta build
- `npm.cmd run lint` → análisis estático
- `npm.cmd test` → tests con Jest

## Endpoints Implementados

### Fase 1: Foundation (v0.2.0) ✅
- `GET /` → estado base de API
- `GET /api/health` → healthcheck

### Fase 2: Auth + Courses (v0.3.0) 🔨
- `POST /auth/login` → generar JWT
- `GET /courses` → listar cursos
- `GET /courses/{id}` → detalle curso
- `/me/**` → protegido por JWT

## Estructura base
- `src/app.ts` configuración de middlewares y rutas
- `src/server.ts` bootstrap de servidor
- `src/common/middleware` error handler y 404
- `src/modules/health` servicio/controlador de health
- `tests` pruebas unitarias/integración iniciales

## Próxima fase
- `feature/2_auth-courses`
  - Prisma + SQLite
  - JWT login
  - cursos seed (6-10)
  - tareas seed por curso
  - endpoints `GET /courses` y `GET /courses/{id}`
