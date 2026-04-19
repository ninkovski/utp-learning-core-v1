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
- `POST /api/auth/login` → generar JWT
- `GET /api/courses` → listar cursos
- `GET /api/courses/{id}` → detalle curso
- `/api/me/**` → protegido por JWT

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

## Quality Gate (v0.5.0) ✅

### Suite obligatoria (3-5 tests)
- `tests/me-enrollments-tasks.e2e.spec.ts` (flujo funcional)
- `tests/quality-gate.e2e.spec.ts` (errores y validaciones)

### Casos de error cubiertos
- Login con payload inválido → `400`
- `/api/me/**` con token inválido o ausente → `401`
- `/api/me/tasks` sin `courseId` → `400`
- `/api/me/tasks` sin inscripción previa → `403`
- Inscripción a curso inexistente → `404`

### Evidencia de ejecución local
1. `npm.cmd test`
2. `npm.cmd run lint`
3. `npm.cmd run build`

Resultado esperado:
- tests en verde
- lint sin errores
- build TypeScript exitoso

## Deploy continuo a Azure (main -> producción)

Se agregó workflow de CI/CD en [azure-main-deploy.yml](.github/workflows/azure-main-deploy.yml).

Comportamiento:
- En cada push a `main` ejecuta: lint, test y build.
- Si todo pasa, despliega a Azure App Service.
- En cada despliegue genera una versión única de producción en formato:
	- `x.y.z-main.<run_number>`
- Esa versión se expone en `GET /api/health` en el campo `version`.

### SQLite temporal persistente para demo
- La app usa Prisma con SQLite dentro del mismo App Service.
- En `production`, el default de `DATABASE_URL` apunta a `/home/site/data/dev.db`.
- Si el archivo no existe al arrancar, se copia una plantilla desde `prisma/dev.db`.
- Esto sirve para una demo de pocos días sin base externa.
- Si quieres garantizar persistencia, configura explícitamente `DATABASE_URL=file:/home/site/data/dev.db` en Azure App Settings.

### Configuración requerida en GitHub
- Repository Variable:
	- `AZURE_WEBAPP_NAME` = nombre del App Service
- Repository Secret:
	- `AZURE_WEBAPP_PUBLISH_PROFILE` = contenido del publish profile descargado desde Azure

### Validación post-deploy
- Consultar `GET https://<tu-app>.azurewebsites.net/api/health`
- Verificar:
	- `status = ok`
	- `version` actualizada respecto al despliegue anterior
