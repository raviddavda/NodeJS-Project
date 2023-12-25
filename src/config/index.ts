import chalk from "chalk";
import { config } from "dotenv";
import { Logger } from "../logs/logger";

const configDotEnv = () => {
  //loading main env file
  config({ path: "src/config/.env" });

  const mode = process.env.NODE_ENV;

  Logger.debug(`App is running in ${chalk.yellow(mode)} mode`);

  config({ path: `src/config/${mode}.env` });
};

export default configDotEnv;
