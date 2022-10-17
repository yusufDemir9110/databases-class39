import express from "express";
import dbRoutes from "./routes/db.js";

const app = express();

app.use("/", dbRoutes);

export default app;
