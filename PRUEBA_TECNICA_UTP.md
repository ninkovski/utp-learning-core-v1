# Prueba Técnica Backend – Mini LMS (Node.js)

## Tecnologías
- Node.js
- JavaScript/TypeScript
- NestJS o Express
- JWT
- Tests (Jest)

## Plazo
- 2 días calendario
- Esfuerzo esperado CORE: 8–12 horas

## Objetivo
Construir un API REST para un Mini LMS donde un usuario inicia sesión (JWT), consulta cursos y tareas precargadas, se inscribe/retira de cursos y marca/desmarca tareas como completadas (progreso por usuario).

## 1) Stack requerido / sugerido
- Runtime: Node.js (LTS)
- Lenguaje: JavaScript (TypeScript recomendado)
- Framework: NestJS o Express (libre elección)
- Persistencia: SQLite recomendado (Prisma / TypeORM / Sequelize) o equivalente
- Tests: Jest (Supertest opcional para integración)

## 2) Requerimientos funcionales (CORE)

### 2.1 Autenticación (JWT)
- `POST /auth/login` → retorna JWT
- Usuarios precargados (seed) o registro simple (opcional)
- Endpoints bajo `/me/**` requieren token (middleware/guard)

### 2.2 Cursos (seed)
- `GET /courses` → listado de cursos
- `GET /courses/{id}` → detalle de curso
- Cursos precargados al iniciar (mínimo 6–10)

### 2.3 Inscripción (usuario autenticado)
- `GET /me/enrollments` → cursos donde estoy inscrito
- `POST /me/enrollments/{courseId}` → inscribirse
- `DELETE /me/enrollments/{courseId}` → retirarse
- Regla: evitar inscripción duplicada por usuario y curso

### 2.4 Tareas por curso (seed)
- Tareas precargadas al iniciar y asociadas a cada curso
- No se requiere CRUD de tareas (solo lectura)
- `GET /courses/{courseId}/tasks` → listar tareas del curso
- `GET /courses/{courseId}/tasks/{taskId}` → detalle de la tarea

### 2.5 Progreso de tareas (por usuario)
- `GET /me/tasks?courseId={id}` → tareas del curso con estado (pendiente/completada)
- `POST /me/tasks/{taskId}/complete` → marcar completada
- `DELETE /me/tasks/{taskId}/complete` → desmarcar (pendiente)
- Regla: estado de completado es por usuario

## 3) Calidad mínima (CORE)
- Validación de inputs (class-validator, Zod, Joi o equivalente)
- Manejo de errores consistente (400/401/403/404) con handler centralizado
- DTOs/schemas para requests y responses
- Separación por capas: controllers/routes → services → repositories/DAO
- Código testeable (dependencias desacopladas)

## 4) Pruebas (obligatorio)
Implementar 3–5 tests (unitarios o mixtos con integración), cubriendo al menos:
1. Inscripción exitosa
2. Inscripción duplicada (error esperado)
3. Marcar tarea como completada y verificar estado por usuario
4. Desmarcar tarea (volver a pendiente)
5. Acceso a `/me/**` sin token retorna 401 (ideal integración)

## 5) Bonus (Opcional)
- OpenAPI/Swagger
- Docker / docker-compose
- Más tests de integración (Supertest)
- Paginación simple en `GET /courses` o `GET /courses/{courseId}/tasks`

## 6) Entrega
- Repositorio con el proyecto backend
- README con pasos exactos para ejecutar en local, endpoints CORE, supuestos y decisiones técnicas
- Indicar credenciales seed y cómo se realiza el seeding
