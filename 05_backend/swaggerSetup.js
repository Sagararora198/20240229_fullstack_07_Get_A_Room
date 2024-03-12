import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export function setupSwagger(app) {
    // Swagger definition
    const swaggerDefinition = {
        openapi: '3.0.0',
        info: {
            title: 'Express API for JSONPlaceholder',
            version: '1.0.0',
        },
        servers: [{
            url: "http://localhost:3000/"
        }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    };

    // Options for the swagger docs
    const options = {
        swaggerDefinition,
        // Paths to files containing OpenAPI definitions
        apis: ['./routes/*.js'],
    };

    // Initialize swagger-jsdoc -> returns validated swagger spec in json format
    const swaggerSpec = swaggerJSDoc(options);

    // Serve swagger docs
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
