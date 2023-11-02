import { NextResponse } from "next/server";
import prisma from "@/lib/db"
import { hash } from "bcrypt";

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { userId, lectureId, text } = body
        const newComment = await prisma.comment.create({
            data: {
                userId: userId,
                lectureId: lectureId,
                text: text,
            }
        });

        return NextResponse.json({ comment: newComment, message: "comment saved" }, { status: 201 });
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "could not save comment" }, { status: 409 });
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const lectureId: any = searchParams.get('lectureId');

        const comments = await prisma.comment.findMany({
            where: {
                lectureId: lectureId
            },
            select: { user: true, text: true, createdAt: true },
            orderBy: { createdAt: "desc" }
        })

        return NextResponse.json({ comments }, { status: 201 });
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "could not fetch comment" }, { status: 405 });
    }
}
