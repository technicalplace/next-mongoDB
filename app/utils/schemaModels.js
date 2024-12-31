import mongoose from "mongoose";

const schema = mongoose.Schema;

const ItemSchema = new schema({
  title: String,
  image: String,
  price: String,
  description: String,
  email: String,
});

const UserSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const ItemModel = mongoose.models.Item || mongoose.model("Item", ItemSchema);

export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);