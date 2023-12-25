import mongoose from "mongoose";
import { initDB } from "./initDB";
import chalk from "chalk";
import { Logger } from "../logs/logger";

const connect = async () => {
  try {
    //importing connection ip from env
    const connectionString = process.env.DB_CONNECTION_STRING;

    if (!connectionString) {
      Logger.error("DB string is not defined!");
      return;
    }

    //connecting to database
    await mongoose.connect(connectionString);

    Logger.success("Database connected");

    //initiate database if empty
    await initDB();
  } catch (error) {
    Logger.error(chalk.red("Can't connect to database"), error);
  }
};

export { connect };
