import { Schema } from "mongoose";
import { addressSchema } from "./address-schema";
import { ICard } from "../../@types/cards";
import { imageSchema } from "./image-schema";

const cardSchema = new Schema<ICard>({
  address: addressSchema,
  image: {
    type: imageSchema,
    required: false,
    default: { url: "public/images/default-avatar.webp", alt: "user-profile" },
  },
  userId: {
    type: String,
    required: false,
  },
  bizNumber: {
    type: Number,
    required: false,
    default: () => Math.floor(Math.random() * 1_000_000),
    unique: true,
  },
  likes: [{ type: String }],
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  subtitle: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  phone: {
    required: true,
    type: String,
    minlength: 9,
    maxlength: 15,
  },
  email: {
    unique: true,
    required: true,
    type: String,
    minlength: 5,
    maxlength: 50,
  },
  web: {
    type: String,
    required: false,
    default: "",
    maxlength: 200,
  },
  createdAt: {
    type: Date,
    required: false,
    default: new Date(),
  },
});

export { cardSchema };
