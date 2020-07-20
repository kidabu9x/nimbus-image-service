import express from "express";
import logger from "morgan";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import UploadController from "./controller/UploadController";

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

app.use("/v1", UploadController)

const port = 48083;
app.listen(port, () => {
  console.log(`App started at: localhost:${port}`);
});
