import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { BookModel } from "@/app/utils/schemaModels";

export async function POST(request) {
  const reqBody = await request.json();
  const searchCondition = reqBody.searchCondition;

  try {
    await connectDB();
    const searchedBooks = await BookModel.find(searchCondition);
    return NextResponse.json({
      message: "検索成功",
      searchedBooks: searchedBooks,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "検索失敗" });
  }
}
