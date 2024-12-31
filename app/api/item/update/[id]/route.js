import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function PUT(request, context) {
  const reqBody = await request.json();
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(context.params.id);

    // アイテム作成者と同じメールアドレスの含まれたトークンを保持するユーザーだけが更新できる
    if (singleItem === reqBody.email) {
      await ItemModel.updateOne({ _id: context.params.id }, reqBody);
      return NextResponse.json({ message: "更新成功" });
    } else {
      return NextResponse.json({ message: "他の人が作成したアイテムです" });
    }
  } catch (error) {
    return NextResponse.json({ message: "エラー" });
  }
}