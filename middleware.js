import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(request, context) {
  const token = await request.headers.get("Authorization")?.split(" ")[1];
  // トークンがリクエストに含まれていない場合
  if (!token) {
    return NextResponse.json({ message: "トークンがありません" });
  }

  // トークンがリクエストに含まれている場合
  try {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const decodeJwt = await jwtVerify(token, secretKey);
    // next() これはこのファイルでの処理が問題なく終了したことを示す
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ message: "トークンが正しくないのでログインしてください。" });
  }

}

export const config = {
  matcher: ["/api/item/create", "/api/item/update/:path*", "/api/item/delete/:path*"],
}

