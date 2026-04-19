# Releases Plan – Mini LMS Backend

## Política de releases
- Estrategia: SemVer
- Convención de tag: `vMAJOR.MINOR.PATCH`
- Rama de documentación: `feature/0_documentacion`
- Rama de integración final: `main`

## v0.1.0 – Documentation Baseline
Estado: Planned

Objetivo:
- Congelar alcance, historias y orden de implementación.

Entregables:
- Documento base de requerimientos del reto.
- Plan de releases e historias.
- Matriz de trazabilidad HU → tareas → commits.

Checklist de salida:
- [ ] Alcance CORE validado.
- [ ] Historias de usuario con criterios.
- [ ] DoD documentado.
- [ ] Riesgos y mitigaciones registradas.

## v0.2.0 – Foundation
Estado: Planned

Objetivo:
- Proyecto inicial ejecutable con arquitectura por capas.

Entregables:
- Estructura de proyecto.
- Configuración de TypeScript, lint y test.
- Manejo centralizado de errores.

Checklist de salida:
- [ ] Aplicación levanta localmente.
- [ ] Healthcheck disponible.
- [ ] Error middleware activo.

## v0.3.0 – Auth + Courses
Estado: Planned

Objetivo:
- Login JWT y endpoints públicos de cursos.

Entregables:
- `POST /auth/login`
- `GET /courses`
- `GET /courses/{id}`
- Seed de usuarios/cursos/tareas.

Checklist de salida:
- [ ] Token emitido para credenciales válidas.
- [ ] Cursos seed disponibles.
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
