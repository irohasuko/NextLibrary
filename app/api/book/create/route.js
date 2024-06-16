import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { BookModel } from "@/app/utils/schemaModels";
import axios from "axios";

export async function POST(request) {
  const reqBody = await request.json();
  const isbn = reqBody.isbn;

  try {
    // データベースと接続
    await connectDB();

    // Google_book_APIから本の情報を取得
    const res = await axios.get(process.env.GOOGLE_BOOK_API_URL + isbn);
    const bookAPIInfo = res.data.items[0].volumeInfo;

    // APIから取ってきた情報を必要な分だけ整形
    const bookInfo = {
      title: bookAPIInfo.title,
      publish_year: bookAPIInfo.publishedDate.substr(0, 4),
      description: bookAPIInfo.description,
      isbn: isbn,
      img_path: bookAPIInfo.imageLinks.thumbnail,
      authors: bookAPIInfo.authors,
    };

    // DBに登録
    await BookModel.create(bookInfo);

    return NextResponse.json({ message: "本の登録に成功", bookInfo });
  } catch (e) {
    if (e.code === 11000) {
      // 既に追加されている本を追加しようとした場合
      return NextResponse.json({ message: "すでに追加されている本です" });
    } else {
      // それ以外のエラー
      return NextResponse.json({ message: "本の登録に失敗" });
    }
  }
}
