import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Express API",
            version: "1.0.0",
            description: "API documentation for Express project"
        },
        servers: [{
            url: "http://localhost:3000"
        }]
    },
    apis: ["./src/modules/**/*.routes.js", "./src/modules/**/*.schema.js"]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;