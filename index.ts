import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import clientRoutes from "./routes/client/index-route";
import moment from "moment";
dotenv.config();
const app: Express = express();
const port: number | string = process.env.PORT || 3000;
app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "pug");
app.locals.moment = moment;
// client routes
clientRoutes(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
