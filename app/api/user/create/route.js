import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";

export async function POST(request) {
  const reqBody = await request.json();
  const name = reqBody.name;

  try {
    // データベースと接続
    await connectDB();

    const user = {
      name: name,
    };

    await UserModel.create(user);

    return NextResponse.json({ message: "ユーザの登録に成功", user });
  } catch (e) {
    return NextResponse.json({ message: "ユーザの登録に失敗" });
  }
}
