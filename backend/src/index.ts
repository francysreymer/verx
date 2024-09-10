import "reflect-metadata";
import express from "express";
import { AppDataSource } from "~/config/database";
import router from "~/routes/farmRoutes";
import { insertMockData } from "~/scripts/insertMockData";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "~/swagger/swaggerDocs";
import cors from "cors";

const app = express();
app.use(express.json());
// Use the CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  })
);
app.use("/api", router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3002;

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source initialized");

    // Insert mock data
    await insertMockData();

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
