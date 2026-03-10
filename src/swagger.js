import swaggerJsdoc from 'swagger-jsdoc';
import config from './config/index.js';

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API with Express JS",
            version: "1.0.0",
            description: "API documentation for API with Express JS"
        },
        servers: [{
            url: `http://localhost:${config.port}`
        }]
    },
    apis: ["./src/modules/**/*.routes.js", "./src/modules/**/*.schema.js"]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;