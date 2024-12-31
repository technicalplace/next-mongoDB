import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
// トークン生成
import { SignJWT } from "jose";
// トークン有効性確認


export async function POST(request, context) {
  const reqBody = await request.json();
  try {
    await connectDB();
    const existUserData = await UserModel.findOne({ email: reqBody.email });

    // ユーザーデータが存在する場合
    if (existUserData) {
      if (existUserData.password !== reqBody.password) {
        return NextResponse.json({ message: "パスワードが違います" });
      }
      const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
      const payload = {
        email: reqBody.email,
      }

      // トークン生成
      const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1d")
        .sign(secretKey);

      return NextResponse.json({ message: "ログイン成功", token });
    }

    // ユーザーデータが存在しない場合
    return NextResponse.json({ message: "ユーザーが見つかりません" });

  } catch (error) {
    return NextResponse.json({ message: "ログイン失敗" });
  }
}