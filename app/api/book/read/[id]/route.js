import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { BookModel } from "@/app/utils/schemaModels";

export async function GET(request, context) {
  try {
    await connectDB();
    const book = await BookModel.findById(context.params.id);
    return NextResponse.json({
      message: "本情報の読み取り成功",
      book: book,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "本情報の読み取り失敗" });
  }
}
