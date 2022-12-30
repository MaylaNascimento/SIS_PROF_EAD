import express from "express";
import cors from "cors";
import helmet from "helmet";
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;