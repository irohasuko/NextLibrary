import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { BookModel, LendModel } from "@/app/utils/schemaModels";

export async function POST(request) {
  const reqBody = await request.json();
  const userId = reqBody.userId;
  const bookId = reqBody.bookId;

  try {
    // データベースと接続
    await connectDB();

    // 本情報の更新

    // 本の貸し出し可否を判定
    const book = await BookModel.findOne({ _id: bookId });

    if (book.is_lend === false) {
      const book = await BookModel.updateOne(
        {
          _id: bookId,
        },
        {
          is_lend: true,
        }
      );
    } else {
      return NextResponse.json({ message: "エラー：その本は貸し出し中です" });
    }

    // 貸し出し情報の追記

    // 日時の処理
    const today = new Date();
    today.setDate(today.getDate() + 14);

    // 貸し出し情報の作成
    const lendInfo = {
      user_id: userId,
      book_id: bookId,
      expected_return_date: new Date(today.toDateString()),
      is_returned: false,
    };

    await LendModel.create(lendInfo);

    return NextResponse.json({ message: "貸し出し処理に成功", lendInfo });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "貸し出し処理に失敗" });
  }
}
