const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "My Temples API",
        description: "Describes Temples"
    },
    host: "localhost:8080",
    schemes: ["http"]
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);