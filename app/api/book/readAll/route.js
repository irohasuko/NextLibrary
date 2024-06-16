import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { BookModel } from "@/app/utils/schemaModels";

export async function GET() {
  try {
    await connectDB();
    const allbooks = await BookModel.find();
    return NextResponse.json({
      message: "すべての本情報の読み込みに成功",
      allBooks: allbooks,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "本情報の読み込みに失敗" });
  }
}
