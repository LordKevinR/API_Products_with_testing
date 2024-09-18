import swaggerJSDoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.2",
    tags: [
      {
        name: "products",
        description: "Operations about products",
      },
    ],
    info: {
      title: "API Rest with Node.js / Express / TypeScript",
      version: "1.0.0",
      description: "This is a API RESTful with Typescript and Express",
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
  },
  apis: ["./src/router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
