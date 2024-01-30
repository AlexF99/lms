"use server"

import prisma from "@/lib/db";

interface module {
    title: string,
    courseId: string
}

export default async function addModuleAction(mod: module) {
    const { title, courseId } = mod;
    try {
        await prisma.module.create({ data: { title, course: { connect: { id: courseId } } } })
    } catch (error) {
        console.log(error);
    }
}