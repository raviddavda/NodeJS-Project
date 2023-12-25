import { Logger } from "../logs/logger";
import { Card } from "./model/cards";
import { User } from "./model/user";
import { initUsers } from "./initial-users";
import { initCards } from "./initial-cards";

const initDB = async () => {
  const usersCount = await User.countDocuments();
  if (usersCount != 0) return;

  for (let user of initUsers) {
    const saved = await new User(user).save();
    Logger.log("Database empty, Automatically added:", saved);
  }

  const cardsCount = await Card.countDocuments();
  if (cardsCount != 0) return;

  for (let card of initCards) {
    const saved = await new Card(card).save();
    Logger.log("Database empty, Automatically added:", saved);
  }
};

export { initDB };
