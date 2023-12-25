import { Schema } from "mongoose";
import { IUser } from "../../@types/user";
import { nameSchema } from "./name-schema";
import { addressSchema } from "./address-schema";
import { imageSchema } from "./image-schema";

const userSchema = new Schema<IUser>({
  name: nameSchema,
  address: addressSchema,
  image: {
    type: imageSchema,
    required: false,
    default: { url: "public/images/default-avatar.webp", alt: "user-profile" },
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
  password: {
    required: true,
    type: String,
    minlength: 7,
    maxlength: 100,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
  isBusiness: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    required: false,
    default: new Date(),
  },
});

export { userSchema };
