import { Schema } from "mongoose";
import { IAddress } from "../../@types/user";

const addressSchema = new Schema<IAddress>({
  city: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  houseNumber: {
    required: true,
    type: Number,
    minlength: 0,
    maxlength: 99999,
  },
  country: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  state: {
    required: false,
    default: "",
    type: String,
    maxlength: 50,
  },
  street: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  zip: {
    required: false,
    default: "0",
    type: String,
    maxlength: 30,
  },
});

export { addressSchema };
