// app/api/message/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Message from '@/models/Message';

// 存储新消息
export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const message = await Message.create({
      content: body.message
    });
    
    return NextResponse.json(
      { success: true, data: message },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// 获取所有消息
export async function GET() {
  try {
    await dbConnect();
    const messages = await Message.find({}).sort({ createdAt: -1 }).limit(100);
    
    return NextResponse.json({ success: true, data: messages }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}