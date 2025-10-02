import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import clientRoutes from "./routes/client/index-route";
import adminRoutes from "./routes/admin/index-route";
import moment from "moment";
import bodyParser from "body-parser";
import { systemConfig } from "./config/system";
dotenv.config();
const app: Express = express();
const port: number | string = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("views", "./views");
app.set("view engine", "pug");
app.locals.moment = moment;
app.locals.prefixAdmin = systemConfig.prefixAdmin;
// client routes
clientRoutes(app);
// admin routes
adminRoutes(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
