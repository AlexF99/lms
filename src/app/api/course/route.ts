import { NextResponse } from "next/server";
import prisma from "@/lib/db"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { title, categoryId } = body;
        const admin = await prisma.user.findUnique({
            where: {
                role: 'ADMIN',
                email: 'admin'
            },
            select: { id: true }
        })

        if (!admin) {
            return NextResponse.json({ message: "could not save course" }, { status: 409 });
        }

        const newCourse = await prisma.course.create({
            data: {
                ownerId: admin.id,
                title: title,
                categories: {
                    connect: [{
                        id: categoryId
                    }]
                }
            }
        });

        return NextResponse.json({ course: newCourse, message: "lecture created" }, { status: 201 });
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "could not save lecture" }, { status: 409 });
    }
}


export async function PUT(req: Request) {
    try {
        const body = await req.json()
        const { title, categoryId, id } = body;
        const updatedCourse = await prisma.course.update({
            where: {
                id
            },
            data: {
                title: title,
                categories: {
                    connect: [{
                        id: categoryId
                    }]
                }
            }
        });

        return NextResponse.json({ course: updatedCourse, message: "lecture updated" }, { status: 201 });
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "could not save lecture" }, { status: 409 });
    }
}