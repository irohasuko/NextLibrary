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

export const BookModel =
  mongoose.models.Book || mongoose.model("Book", BookSchema);
