import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize(
  process.env.DATABASE_NAME, // tên database
  process.env.DATABASE_USERNAME, // username
  process.env.DATABASE_PASSWORD, // password
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
  }
);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connect success.");
  })
  .catch((error) => {
    console.error("connect error: ", error);
  });
export default sequelize;
