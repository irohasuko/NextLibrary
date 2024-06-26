import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { BookModel } from "@/app/utils/schemaModels";

export async function POST(request) {
  const reqBody = await request.json();
  const target = reqBody.target;

  try {
    await connectDB();
    const searchedBooks = await BookModel.find({
      $or: [
        { title: { $regex: target, $options: "i" } },
        { description: { $regex: target, $options: "i" } },
        { authors: { $regex: target, $options: "i" } },
      ],
    });
    return NextResponse.json({
      message: "検索成功",
      searchedBooks: searchedBooks,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "検索失敗" });
  }
}
