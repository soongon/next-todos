import { ConnectDB } from "@/lib/config/db";
import TodoModel from "@/lib/models/todo";
import { NextResponse } from "next/server"

const loadDB = async () => {
    await ConnectDB();
}

loadDB();

export async function GET(request) {

    const todos = await TodoModel.find({});

    return NextResponse.json({todos: todos});
}

export async function POST(request) {

    const {title, description} = await request.json();
    await TodoModel.create({
        title,
        description,
    });

    return NextResponse.json({
        msg: "Todo Created..",
    });
    
}

export async function DELETE(request) {
    // 경로변수 확수
    const mongoId = await request.nextUrl.searchParams.get('mongoId');
    // 삭제 수행
    await TodoModel.findByIdAndDelete(mongoId);
    return NextResponse.json({msg: "Todo deleted.."});
}

export async function PUT(request) {
    // 경로변수 확수
    const mongoId = await request.nextUrl.searchParams.get('mongoId');
    // 삭제 수행
    await TodoModel.findByIdAndUpdate(mongoId, {
        $set: {
            isCompleted: true,
        }
    });
    return NextResponse.json({msg: "Todo updated.."});
}