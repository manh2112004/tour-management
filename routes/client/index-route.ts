import { Express } from "express";
import { tourRoutes } from "../client/tour-route";
const clientRoutes = (app: Express): void => {
  app.use("/tours", tourRoutes);
};
export default clientRoutes;
