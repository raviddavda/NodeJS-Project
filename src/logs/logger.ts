import chalk from "chalk";

class Logger {
  static success(...messages: any[]) {
    console.log(chalk.green(messages));
  }

  static error(...messages: any[]) {
    console.error(chalk.red(messages));
  }

  static info(...messages: any[]) {
    if (process.env.NODE_ENV === "prod") return;
    console.info(chalk.yellow(messages));
  }

  static debug(...messages: any[]) {
    console.debug(chalk.blue(messages));
  }

  static log(...messages: any[]) {
    if (process.env.NODE_ENV === "prod") return;
    console.log(messages);
  }
}

export { Logger };
