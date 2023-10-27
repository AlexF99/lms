import { NextResponse } from "next/server";
import prisma from "@/lib/db"
import { hash } from "bcrypt";

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, name, role, password } = body
        const existing = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (existing) return NextResponse.json({ user: null, message: "email taken!" }, { status: 409 });

        const hashedPsw = await hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                role,
                password: hashedPsw
            },
            select: {
                email: true,
                name: true,
                role: true
            }
        })
        return NextResponse.json({ user: newUser, message: "user successfully created" }, { status: 201 });
    } catch (err) {
        console.log(err)
        return NextResponse.json({ user: null, message: "could not create user" }, { status: 409 });
    }
}

export async function GET() {
    const users = await prisma.user.findMany({
        select: {
            email: true,
            name: true,
            role: true,
        }
    })
    return NextResponse.json({ sucess: true, users }, { status: 200 })
}