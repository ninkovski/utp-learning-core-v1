# Mini LMS Backend

Base técnica del proyecto para la prueba UTP.

## Estado actual
- Fase: `feature/3_enrollments`
- Stack base: Node.js + TypeScript + Express + Prisma + SQLite
- Incluye: lint, tests, manejo central de errores, healthcheck, auth JWT, cursos seed

## Requisitos
- Node.js 20+
- npm 10+

## Instalación
En PowerShell con restricción de scripts, usar `npm.cmd`:

1. `npm.cmd install`
2. Crear `.env` tomando `.env.example`
3. `npm.cmd run prisma:migrate`
4. `npm.cmd run prisma:seed`
5. `npm.cmd run dev`

## Credenciales seed
- `ana@utp.edu` / `123456`
- `carlos@utp.edu` / `123456`

## Scripts
- `npm.cmd run dev` → modo desarrollo
- `npm.cmd run build` → compila TypeScript a `dist/`
- `npm.cmd run start` → ejecuta build
- `npm.cmd run lint` → análisis estático
- `npm.cmd test` → tests con Jest
- `npm.cmd run prisma:migrate` → migraciones
- `npm.cmd run prisma:seed` → carga seed

## Endpoints Implementados

### Fase 1: Foundation (v0.2.0) ✅
- `GET /` → estado base de API
- `GET /api/health` → healthcheck

### Fase 2: Auth + Courses (v0.3.0) 🔨
- `POST /auth/login` → generar JWT
- `GET /courses` → listar cursos
- `GET /courses/{id}` → detalle curso
- `/me/**` → protegido por JWT (validación `/me/**`)

## Estructura base
- `src/app.ts` configuración de middlewares y rutas
- `src/server.ts` bootstrap de servidor
- `src/common/middleware` error handler, 404, auth-jwt
- `src/modules/auth` login JWT
- `src/modules/courses` catálogo de cursos
- `src/modules/health` servicio/controlador de health
- `prisma` schema, migraciones y seed
- `tests` pruebas unitarias/integración

## Fase 3: Enrollments + Tasks Progress (v0.4.0) 🔨
- `GET /api/me/enrollments` → cursos donde estoy inscrito
- `POST /api/me/enrollments/{courseId}` → inscribirse (sin duplicados)
- `DELETE /api/me/enrollments/{courseId}` → retirarse
- `GET /api/me/tasks?courseId={id}` → tareas con estado por usuario
- `POST /api/me/tasks/{taskId}/complete` → marcar completada
- `DELETE /api/me/tasks/{taskId}/complete` → desmarcar completada
