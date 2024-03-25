import express, { Express } from "express";
import cors from "cors";

import config from "./config";
import connectDB from "./config/db";

import "./services/telegram";
import "./services/ws";

const app: Express = express();

let db;
(async function () {
  db = await connectDB();
})();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(config.PORT, () => {
  console.log(`Server is running at PORT ${config.PORT}`);
});
