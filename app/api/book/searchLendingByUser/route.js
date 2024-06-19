import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { BookModel, LendModel } from "@/app/utils/schemaModels";

export async function POST(request) {
  const reqBody = await request.json();
  const userId = reqBody.userId;
  try {
    // DB接続処理
    await connectDB();

    // ユーザが借りている本の貸し出し情報を取得
    const lendInfo = await LendModel.find({
      user_id: userId,
      is_returned: false,
    });

    const bookIds = [];
    if (lendInfo) {
      lendInfo.map(async (info) => {
        bookIds.push(info.book_id);
      });
    }

    const books = await BookModel.find({ _id: { $in: bookIds } });

    return NextResponse.json({
      message: "返却できる本情報の読み込みに成功",
      books: books,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "本情報の読み込みに失敗" });
  }
}
