import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Farm API",
      version: "1.0.0",
      description: "API documentation for the Farm application",
    },
  },
  apis: [path.join(__dirname, "../routes/*.ts")],
};

export const swaggerDocs = swaggerJsdoc(swaggerOptions);
