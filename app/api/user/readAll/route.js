import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";

export async function GET() {
  try {
    await connectDB();
    const allUsers = await UserModel.find();
    return NextResponse.json({
      message: "すべてのユーザ情報の読み込みに成功",
      allUsers: allUsers,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "本情報の読み込みに失敗" });
  }
}
