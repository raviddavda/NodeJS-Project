import { Schema } from "mongoose";
import { IImage } from "../../@types/user";

const imageSchema = new Schema<IImage>({
  url: {
    type: String,
    required: true,
    minlength: 12,
    maxlength: 200,
  },
  alt: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
});

export { imageSchema };
