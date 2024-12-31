import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(context.params.id);
    return NextResponse.json({ message: "アイテム取得 個別データ", singleItem });
  } catch (error) {
    return NextResponse.json({ message: "エラー" });
  }
}