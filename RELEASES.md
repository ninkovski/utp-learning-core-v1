# Releases Plan – Mini LMS Backend

## Política de releases
- Estrategia: SemVer
- Convención de tag: `vMAJOR.MINOR.PATCH`
- Rama de documentación: `feature/0_documentacion`
- Rama de integración final: `main`

## v0.1.0 – Documentation Baseline
Estado: Completed ✅

Objetivo:
- Congelar alcance, historias y orden de implementación.

Entregables:
- Documento base de requerimientos del reto.
- Plan de releases e historias.
- Matriz de trazabilidad HU → tareas → commits.

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
- Configuración de TypeScript, lint y test.
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
- Pruebas iniciales de healthcheck y not found.
- 3 tests pasando (unit + integración).

## v0.3.0 – Auth + Courses
Estado: In Progress 🔨
Rama: `feature/2_auth-courses`

Objetivo:
- Login JWT y endpoints públicos de cursos.

Entregables:
- Prisma + SQLite schema (usuarios/cursos/tareas)
- Seed inicial de datos
- `POST /auth/login`
- `GET /courses`
- `GET /courses/{id}`
- JWT middleware para proteger `/me/**`

Checklist de salida:
- [ ] Token emitido para credenciales válidas.
- [ ] Cursos seed disponibles (6–10).
- [ ] Tareas seed por curso.
- [ ] 401 y 404 consistentes.

## v0.4.0 – Enrollments + Tasks Progress
Estado: Planned

Objetivo:
- Completar reglas de negocio por usuario autenticado.

Entregables:
- `/me/enrollments` completo.
- `/me/tasks` con estado por usuario.
- Marcar/desmarcar completado.

Checklist de salida:
- [ ] Sin duplicidad de inscripción.
- [ ] Estado por usuario aislado.
- [ ] Endpoints protegidos bajo `/me/**`.

## v0.5.0 – Quality Gate
Estado: Planned

Objetivo:
- Demostrar robustez funcional con pruebas.

Entregables:
- Suite de 3–5 tests obligatorios.
- README final de ejecución.

Checklist de salida:
- [ ] Tests obligatorios en verde.
- [ ] Casos de error cubiertos.
- [ ] Evidencia de ejecución incluida.

## v0.6.0 – Cloud Delivery
Estado: Planned

Objetivo:
- Entrega pública para pruebas técnicas.

Entregables:
- Pipeline en GitHub Actions.
- Deploy a Azure App Service.
- URL pública de validación.

Checklist de salida:
- [ ] Build y test automáticos en CI.
- [ ] Deploy automatizado por branch/tag.
- [ ] URL final documentada para evaluadores.
