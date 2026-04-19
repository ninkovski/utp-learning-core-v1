# Matriz de Trazabilidad – HU, Tareas, Commits y Release

## Convención de commits
- Formato: `tipo(scope): descripción`
- Tipos usados: `docs`, `chore`, `feat`, `test`, `ci`

## Trazabilidad

| HU | Historia de Usuario | Release objetivo | Tareas clave | Commits esperados |
|---|---|---|---|---|
| HU-01 | Login con JWT | v0.3.0 | endpoint login, firma token, manejo 401 | `feat(auth): implement login and jwt guard` |
| HU-02 | Ver cursos y detalle | v0.3.0 | listado cursos, detalle por id, 404 | `feat(courses): implement courses read endpoints` |
| HU-03 | Inscripción y retiro | v0.4.0 | alta/baja inscripción, regla anti-duplicado | `feat(enrollments): implement me enrollments flow` |
| HU-04 | Ver tareas por curso | v0.4.0 | listado y detalle de tareas por curso | `feat(tasks): implement tasks and progress by user` |
| HU-05 | Progreso por usuario | v0.4.0 | completar/descompletar, consulta de estado | `feat(tasks): implement tasks and progress by user` |

## Trazabilidad de calidad

| Requisito de calidad | Release | Evidencia |
|---|---|---|
| Validación de inputs | v0.2.0-v0.4.0 | schemas/DTO + respuestas 400 |
| Errores consistentes | v0.2.0 | middleware central + catálogo de errores |
| Código testeable | v0.2.0-v0.5.0 | separación por capas + tests de servicio |
| Tests obligatorios | v0.5.0 | suite Jest/Supertest en verde |
| `/me/**` protegido | v0.3.0-v0.4.0 | test integración 401 sin token |

## Secuencia de commits sugerida
1. `docs(scope): define roadmap, historias y criterios`
2. `docs(releases): add releases and traceability matrix`
3. `chore(init): bootstrap express + ts + eslint + jest`
4. `feat(db): add prisma schema and seed data`
5. `feat(auth): implement login and jwt guard`
6. `feat(courses): implement courses read endpoints`
7. `feat(enrollments): implement me enrollments flow`
8. `feat(tasks): implement tasks and progress by user`
9. `test(core): add enrollment and task progress coverage`
10. `docs(readme): execution guide and technical decisions`
11. `ci(azure): add github actions and app service deploy`

## Criterio de cierre por release
- Cada release se cierra sólo con:
  - checklist completo,
  - evidencia funcional,
  - y commit/tag correspondiente.
