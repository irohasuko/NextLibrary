import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  publish_year: {
    type: Number,
  },
  description: {
    type: String,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  img_path: {
    type: String,
  },
  authors: [
    {
      type: String,
    },
  ],
  is_lend: {
    type: Boolean,
    default: false,
  },
});

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const LendSchema = new Schema({
  book_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  expected_return_date: {
    type: Date,
    required: true,
  },
  return_date: {
    type: Date,
  },
  is_returned: {
    type: Boolean,
    default: false,
  },
});

export const BookModel =
  mongoose.models.Book || mongoose.model("Book", BookSchema);

export const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema);

export const LendModel =
  mongoose.models.Lend || mongoose.model("Lend", LendSchema);
