import configDotEnv from "./config";
import express, { json } from "express";
import { notFound } from "./middleware/not-found";
import { connect } from "./database/connect";
import { userRouter } from "./routes/users-route";
import { errorHandler } from "./middleware/error-handler";
import morgan from "morgan";
import cors from "cors";
import { cardsRouter } from "./routes/cards-route";

configDotEnv();
connect();
const app = express();

app.use(express.static("public"));
//middleware chain
app.use(json());
app.use(cors());
app.use(morgan("combined"));
app.use("/api/v1/users", userRouter);
app.use("/api/v1/cards", cardsRouter);
app.use(errorHandler);
app.use(notFound);

app.listen(8080);
