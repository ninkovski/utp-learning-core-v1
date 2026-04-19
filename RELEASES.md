# Releases Plan - Mini LMS Backend

- Estrategia: SemVer
- Convencion de tag: `vMAJOR.MINOR.PATCH`
- Rama de documentacion: `feature/0_documentacion`
- Rama de integracion final: `main`

## v0.1.0 – Documentation Baseline
Estado: Completed ✅

Objetivo:
- Congelar alcance, historias y orden de implementación.

Entregables:
- Documento base de requerimientos del reto.
- Plan de releases e historias.
- Matriz de trazabilidad HU -> tareas -> commits.

Checklist de salida:
- [x] Alcance CORE validado.
- [x] Historias de usuario con criterios.
- [x] DoD documentado.
- [x] Riesgos y mitigaciones registradas.

## v0.2.0 – Foundation
Estado: Completed ✅

Objetivo:
- Proyecto inicial ejecutable con arquitectura por capas.

Entregables:
- Estructura de proyecto.
- Configuracion de TypeScript, lint y test.
- Manejo centralizado de errores.

Checklist de salida:
- [x] Aplicación levanta localmente.
- [x] Healthcheck disponible.
- [x] Error middleware activo.

Avance implementado en `feature/1_foundation`:
- Bootstrap Node.js + TypeScript + Express.
- Configuración de ESLint, Prettier, Jest y Supertest.
- Middleware centralizado de errores + 404.
- Endpoint base `GET /` y `GET /api/health`.
- 3 tests pasando (unit + integracion).

## v0.3.0 - Auth + Courses
Estado: In Progress
Rama: `feature/2_auth-courses`

Objetivo:
- Login JWT y endpoints publicos de cursos.

Entregables:
- Prisma + SQLite schema (usuarios/cursos/tareas).
- Seed inicial de datos.
- `POST /api/auth/login`.
- `GET /api/courses`.
- `GET /api/courses/{id}`.
- JWT middleware para proteger `/me/**`.

Checklist de salida:
- [x] Token emitido para credenciales validas.
- [x] Cursos seed disponibles (6-10).
- [x] Tareas seed por curso.
- [x] 401 consistente en `/api/me/profile` sin token.
- [x] 404 consistente para rutas inexistentes.

Evidencia:
- Tests en verde: 7 passing.
- Build TypeScript en verde.

## v0.4.0 - Enrollments + Tasks Progress
Estado: In Progress

Objetivo:
- Completar reglas de negocio por usuario autenticado.

Entregables:
- `/me/enrollments` completo.
- `/me/tasks` con estado por usuario.
- Marcar/desmarcar completado.

Checklist de salida:
- [x] Sin duplicidad de inscripcion.
- [x] Estado por usuario aislado.
- [x] Endpoints protegidos bajo `/me/**`.

## v0.5.0 - Quality Gate
Estado: Completed ✅

Objetivo:
- Demostrar robustez funcional con pruebas.

Entregables:
- Suite de 3-5 tests obligatorios.
- README final de ejecucion.

Checklist de salida:
- [x] Tests obligatorios en verde.
- [x] Casos de error cubiertos.
- [x] Evidencia de ejecucion incluida.

Evidencia:
- Suite obligatoria agregada en `tests/quality-gate.e2e.spec.ts`.
- README final actualizado con ejecución y cobertura de errores.
- Verificación local: test, lint y build en verde.

## v0.6.0 - Cloud Delivery
Estado: In Progress

Objetivo:
- Entrega publica para pruebas tecnicas.

Entregables:
- Pipeline en GitHub Actions.
- Deploy a Azure App Service.
- URL publica de validacion.

Checklist de salida:
- [x] Build y test automaticos en CI.
- [x] Deploy automatizado por branch/tag.
- [ ] URL final documentada para evaluadores.

Evidencia:
- Workflow de despliegue en `.github/workflows/azure-main-deploy.yml`.
- Trigger por push a `main`.
- Versionado automático en producción vía `GET /api/health` -> `version`.
