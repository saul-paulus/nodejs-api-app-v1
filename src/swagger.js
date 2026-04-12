import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API ExpressJS Starter Kit',
      version: '1.0.0',
      description: 'Dokumentasi API untuk ExpressJS Starter Kit dengan autentikasi JWT',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        UserRequest: {
          type: 'object',
          required: ['username', 'id_personal', 'password', 'codeuker', 'id_role'],
          properties: {
            username: { type: 'string' },
            id_personal: { type: 'string' },
            password: { type: 'string' },
            codeuker: { type: 'string' },
            id_role: { type: 'integer' },
          },
        },
        UserUpdateRequest: {
          type: 'object',
          properties: {
            username: { type: 'string' },
            codeuker: { type: 'string' },
            id_role: { type: 'integer' },
          },
        },
      },
    },
  },
  apis: ['./src/modules/**/*.routes.js'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
