# Plan de Documentación, Releases e Historias de Usuario

## Estado de trabajo
- Rama activa objetivo: `feature/0_documentación`
- Foco: documentación funcional/técnica antes de implementación
- Meta: trazabilidad completa de historias, tareas, commits y releases

## 1) Objetivo del producto
Construir un API REST para un Mini LMS donde cada usuario pueda autenticarse con JWT, consultar cursos y tareas precargadas, gestionar su inscripción y actualizar su progreso de tareas de forma aislada por usuario.

## 2) Alcance CORE

### 2.1 Autenticación
- `POST /auth/login` retorna JWT válido.
- Endpoints `/me/**` protegidos por token.

### 2.2 Catálogo de cursos
- `GET /courses`
- `GET /courses/{id}`
- Seed inicial con mínimo 6–10 cursos.

### 2.3 Inscripciones
- `GET /me/enrollments`
- `POST /me/enrollments/{courseId}`
- `DELETE /me/enrollments/{courseId}`
- Regla: no duplicidad de inscripción por usuario/curso.

### 2.4 Tareas por curso
- `GET /courses/{courseId}/tasks`
- `GET /courses/{courseId}/tasks/{taskId}`
- Seed de tareas asociadas por curso.

### 2.5 Progreso por usuario
- `GET /me/tasks?courseId={id}`
- `POST /me/tasks/{taskId}/complete`
- `DELETE /me/tasks/{taskId}/complete`
- Regla: progreso aislado por usuario.

## 3) Arquitectura propuesta (siguiente fase)
- Runtime: Node.js LTS
- Lenguaje: TypeScript
- Framework: Express
- Persistencia: SQLite + Prisma ORM
- Validación: Zod
- Auth: JWT (`access token`)
- Testing: Jest + Supertest

Capas:
- `routes/controllers` (HTTP)
- `services` (reglas de negocio)
- `repositories` (acceso a datos)
- `schemas/dtos` (contratos)
- `middlewares` (auth, errores)

## 4) Historias de usuario

### HU-01 Login
Como usuario, quiero iniciar sesión para obtener un token y consumir mis endpoints privados.

Criterios de aceptación:
- Credenciales válidas retornan 200 + JWT.
- Credenciales inválidas retornan 401 con mensaje claro.

### HU-02 Ver cursos
Como usuario, quiero listar y ver detalle de cursos para conocer la oferta.

Criterios de aceptación:
- Listado retorna cursos seed.
- Detalle por id existente retorna 200; id inexistente retorna 404.

### HU-03 Inscribirme y retirarme
Como usuario autenticado, quiero inscribirme o retirarme de un curso para gestionar mi ruta de aprendizaje.

Criterios de aceptación:
- Inscripción válida retorna 201/200.
- Inscripción duplicada retorna 409.
- Retiro de inscripción existente retorna 204/200.

### HU-04 Consultar tareas del curso
Como usuario, quiero ver tareas por curso y su detalle para saber qué debo completar.

Criterios de aceptación:
- Listado de tareas por curso retorna 200.
- Tarea ajena al curso o inexistente retorna 404.

### HU-05 Gestionar progreso
Como usuario autenticado, quiero marcar/desmarcar tareas completadas para controlar mi avance personal.

Criterios de aceptación:
- Completar tarea retorna 200.
- Desmarcar tarea retorna 200/204.
- `GET /me/tasks` refleja mi estado sin afectar otros usuarios.

## 5) Plan de releases

### Release 0.1.0 – Foundation
Objetivo: base ejecutable + estructura limpia.

Tareas:
- bootstrap del proyecto
- configuración TypeScript/lint/test
- estructura por capas
- error handler central y contratos base

### Release 0.2.0 – Auth + Courses
Objetivo: exponer lectura pública y autenticación.

Tareas:
- seed de usuarios/cursos/tareas
- login JWT
- endpoints `GET /courses` y `GET /courses/{id}`

### Release 0.3.0 – Enrollments
Objetivo: cerrar flujo de inscripción.

Tareas:
- endpoints `/me/enrollments`
- restricción anti-duplicado
- validaciones y códigos HTTP consistentes

### Release 0.4.0 – Tasks Progress
Objetivo: completar CORE de progreso por usuario.

Tareas:
- `GET /me/tasks?courseId={id}`
- completar/descompletar tarea
- aislamiento por usuario autenticado

### Release 0.5.0 – Quality Gate
Objetivo: entregar robustez y demostrabilidad.

Tareas:
- 3–5 tests obligatorios
- README final (setup, seed, credenciales, endpoints)
- checklist de aceptación UTP

### Release 0.6.0 – Delivery Cloud
Objetivo: despliegue reproducible y compartible.

Tareas:
- workflow GitHub Actions (build/test/deploy)
- despliegue a Azure App Service
- URL pública para pruebas

## 6) Orden de commits propuesto
1. `docs(scope): define roadmap, historias y criterios`
2. `chore(init): bootstrap express + ts + eslint + jest`
3. `feat(db): add prisma schema and seed data`
4. `feat(auth): implement login and jwt guard`
5. `feat(courses): implement courses read endpoints`
6. `feat(enrollments): implement me enrollments flow`
7. `feat(tasks): implement tasks and progress by user`
8. `test(core): add enrollment and task progress coverage`
9. `docs(readme): execution guide and technical decisions`
10. `ci(azure): add github actions and app service deploy`

## 7) Definición de Done (DoD)
- Endpoints CORE implementados y validados.
- Errores centralizados con respuestas consistentes.
- DTO/schema en entrada/salida sin filtrar entidades ORM directas.
- Tests mínimos aprobados en CI.
- README operativo con pasos exactos.
- Historial de commits legible por feature.

## 8) Estrategia de ramas y versionado
- Rama actual: `feature/0_documentación`
- Ramas siguientes sugeridas:
  - `feature/1_foundation`
  - `feature/2_auth-courses`
  - `feature/3_enrollments`
  - `feature/4_tasks-progress`
  - `feature/5_quality-delivery`
- Versionado: SemVer (`v0.1.0` a `v0.6.0`)

## 9) Pipeline objetivo (GitHub Actions + Azure)
- Trigger: push/PR a `main` y/o tags `v*`
- Etapas:
  1. install
  2. lint
  3. test
  4. build
  5. deploy a Azure App Service
- Salida esperada: URL pública de pruebas para entregar evaluación.

## 10) Riesgos y mitigaciones
- Riesgo: ambigüedad de códigos HTTP entre 200/201/204.
  - Mitigación: contrato explícito en README + tests de integración.
- Riesgo: inconsistencias en seed entre entornos.
  - Mitigación: comando único de seed idempotente.
- Riesgo: regresiones en reglas de negocio.
  - Mitigación: tests de inscripción duplicada y progreso por usuario.
