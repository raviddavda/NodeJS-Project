import { Router } from "express";
import { createCard } from "../service/card-service";
import { ICardInput } from "../@types/cards";
import { Card } from "../database/model/cards";
import { validateCard } from "../middleware/validation";
import { isBusiness } from "../middleware/authentication/is-business";
import { BizCardsError } from "../error/biz-cards-error";
import { validateToken } from "../middleware/authentication/validate-token";
import { isCreatorOrAdmin } from "../middleware/authentication/is-creator-or-admin";

const router = Router();

//get all cards
router.get("/", async (req, res, next) => {
  try {
    const allCards = await Card.find();

    res.json({ allCards });
  } catch (error) {
    next(error);
  }
});

//create a new card
router.post("/", isBusiness, validateCard, async (req, res, next) => {
  try {
    const userId = req.user?._id;
    if (!userId) throw new BizCardsError("User must have an ID!", 500);

    const saved = await createCard(req.body as ICardInput, userId);

    res.status(201).json({ message: "Card Created!", card: saved });
  } catch (error) {
    next(error);
  }
});

//get user created cards
router.get("/my-cards", validateToken, async (req, res, next) => {
  try {
    const userId = req.user?._id;

    const cards = await Card.find({ userId });

    return res.json(cards);
  } catch (error) {
    next(error);
  }
});

//get card by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const card = await Card.findById(id);

    return res.json(card);
  } catch (error) {
    next(error);
  }
});

//edit card
router.put("/:id", validateToken, validateCard, async (req, res, next) => {
  try {
    const userId = req.user?._id;

    const card = await Card.findById(req.params.id);

    if (userId != card.userId)
      throw new BizCardsError("You are not the owner of this card!", 401);

    const updatedCard = await Card.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    res.json(updatedCard);
  } catch (error) {
    next(error);
  }
});

//like a card
router.patch("/:id", validateToken, async (req, res, next) => {
  try {
    const userId = req.user?._id;

    const card = await Card.findById(req.params.id);

    if (!card.likes.includes(userId)) {
      const likedCard = await Card.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { likes: userId } },
        { new: true }
      );
      res.json(likedCard);
    } else {
      const likedCard = await Card.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { likes: userId } },
        { new: true }
      );
      res.json(likedCard);
    }
  } catch (error) {
    next(error);
  }
});

//delete card
router.delete("/:id", isCreatorOrAdmin, async (req, res, next) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);

    res.json({ message: "Card deleted!" });
  } catch (error) {
    next(error);
  }
});

export { router as cardsRouter };
