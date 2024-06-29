const swaggerAutogen = require("swagger-autogen")

const doc = {
    info: {
        title: "JAS Obregon Attendance API",
        description: "This project is for the project 2, and also for using in the Obregon Mexico stake"
    },
    host: "localhost:3001",
    schemes: ['https', 'http']
}
""
const outputFile = "./swagger.json"
const endpointsFiles = ["./routes/index.js"]

swaggerAutogen(outputFile, endpointsFiles, doc)