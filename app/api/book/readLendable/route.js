import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { BookModel } from "@/app/utils/schemaModels";

export async function GET() {
  try {
    await connectDB();
    const books = await BookModel.find({ is_lend: false });
    return NextResponse.json({
      message: "貸し出せる本情報の読み込みに成功",
      books: books,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "本情報の読み込みに失敗" });
  }
}
