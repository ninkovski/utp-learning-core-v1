import type { Express, NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import listEndpoints from 'express-list-endpoints';

type OpenApiPathOperation = {
  tags: string[];
  summary: string;
  responses: Record<string, { description: string }>;
  security?: Array<Record<string, string[]>>;
};

function toOpenApiPath(path: string): string {
  return path.replace(/:([A-Za-z0-9_]+)/g, '{$1}');
}

function getTagByPath(path: string): string {
  if (path.startsWith('/api/health')) return 'Health';
  if (path.startsWith('/api/auth')) return 'Auth';
  if (path.startsWith('/api/courses')) return 'Courses';
  if (path.startsWith('/api/me')) return 'Me';
  return 'General';
}

function buildOpenApiDocument(app: Express) {
  const rawEndpoints = listEndpoints(app);
  const paths: Record<string, Record<string, OpenApiPathOperation>> = {};

  for (const endpoint of rawEndpoints) {
    if (endpoint.path.startsWith('/api/docs') || endpoint.path.startsWith('/api/openapi.json')) {
      continue;
    }

    const openApiPath = toOpenApiPath(endpoint.path);
    const pathItem = paths[openApiPath] ?? {};
    const tag = getTagByPath(endpoint.path);

    for (const method of endpoint.methods) {
      const normalizedMethod = method.toLowerCase();
      const operation: OpenApiPathOperation = {
        tags: [tag],
        summary: `${method} ${endpoint.path}`,
        responses: {
          200: { description: 'OK' },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
          404: { description: 'Not Found' },
          500: { description: 'Internal Server Error' },
        },
      };

      if (endpoint.path.startsWith('/api/me')) {
        operation.security = [{ bearerAuth: [] }];
      }

      pathItem[normalizedMethod] = operation;
    }

    paths[openApiPath] = pathItem;
  }

  return {
    openapi: '3.0.3',
    info: {
      title: 'Mini LMS Backend API',
      version: '0.5.0',
      description: 'Contrato generado automáticamente desde rutas Express.',
    },
    servers: [{ url: '/' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    paths,
  };
}

export function mountOpenApi(app: Express): void {
  app.get('/api/openapi.json', (_req: Request, res: Response) => {
    res.status(200).json(buildOpenApiDocument(app));
  });

  app.use('/api/docs', swaggerUi.serve, (req: Request, res: Response, next: NextFunction) => {
    const openApiDocument = buildOpenApiDocument(app);
    return swaggerUi.setup(openApiDocument)(req, res, next);
  });
}
