import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { BookModel } from "@/app/utils/schemaModels";

export async function DELETE(request, context) {
  try {
    await connectDB();
    await BookModel.deleteOne({ _id: context.params.id });
    return NextResponse.json({
      message: "アイテム削除成功",
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "アイテム削除失敗" });
  }
}
