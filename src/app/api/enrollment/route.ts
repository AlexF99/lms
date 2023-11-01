import { NextResponse } from "next/server";
import prisma from "@/lib/db"
import { hash } from "bcrypt";

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { userId, courseId } = body
        await prisma.enrollment.create({
            data: {
                userId: userId,
                courseId: courseId,
            }
        });

        return NextResponse.json({ message: "user successfully enrolled" }, { status: 201 });
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "could not enroll user" }, { status: 409 });
    }
}
