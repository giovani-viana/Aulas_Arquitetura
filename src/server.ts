import helmet from "helmet";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { requireLogin } from "./middlewares/auth.middleware";
import { handleCommonError } from "./middlewares/handleCommonError.middleware";
import { handlePrismaError } from "./middlewares/handlePrismaError.middleware";
import { handleZodError } from "./middlewares/handleZodError.middleware";
import authRoute from "./routes/auth.route";
import todoRoute from "./routes/todo.route";

const app = express();

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json());
app.use(cors());
app.use(helmet());

// Include your routes here
app.use("/auth", authRoute);
app.use("/todo", requireLogin, todoRoute);

app.use(handleZodError);
app.use(handlePrismaError);
app.use(handleCommonError);

export default app;
