import { Express } from "express";

import TicketRouter from "./api/ticket";

const configureRoutes = (app: Express) => {
  app.use("/api/ticket", TicketRouter);
  app.use("/", (req, res) => res.send("Server is running"));
};

export default configureRoutes;
