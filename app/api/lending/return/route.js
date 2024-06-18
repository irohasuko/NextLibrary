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

    // 貸し出し情報の取得
    const lendInfo = await LendModel.findOne({
      user_id: userId,
      book_id: bookId,
      is_returned: false,
    });

    console.log(lendInfo);

    // 貸し出し情報があった場合に更新
    if (lendInfo) {
      await LendModel.updateOne(
        {
          _id: lendInfo._id,
        },
        {
          return_date: new Date(),
          is_returned: true,
        }
      );
    } else {
      return NextResponse.json({
        message: "そのユーザはその本を借りていません",
      });
    }

    // 本の貸し出し状態を更新
    await BookModel.updateOne({ _id: bookId }, { is_lend: false });

    return NextResponse.json({ message: "返却処理に成功", lendInfo });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "返却処理に失敗" });
  }
}
