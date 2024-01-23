import { NextResponse } from "next/server";
import prisma from "@/lib/db"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { moduleId, title, richText, media } = body;
        const newLecture = await prisma.lecture.create({
            data: {
                moduleId: moduleId,
                title: title,
                media: media,
                richText: richText,
            }
        });

        return NextResponse.json({ lecture: newLecture, message: "lecture created" }, { status: 201 });
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "could not save lecture" }, { status: 409 });
    }
}


export async function PUT(req: Request) {
    try {
        const body = await req.json()
        const { moduleId, title, richText, media, id } = body;
        const newLecture = await prisma.lecture.update({
            where: {
                id: id
            },
            data: {
                moduleId: moduleId,
                title: title,
                media: media,
                richText: richText,
            }
        });

        return NextResponse.json({ lecture: newLecture, message: "lecture updated" }, { status: 201 });
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "could not save lecture" }, { status: 409 });
    }
}