import connectDB from '@/app/utils/database';
import { ItemModel } from '@/app/utils/schemaModels';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectDB();
    const allItems = await ItemModel.find();
    return NextResponse.json({ message: 'アイテム全取得成功', allItems });
  } catch (error) {
    return NextResponse.json({ message: 'エラー' });
  }
}

export const revalidate = 0;