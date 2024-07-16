"use server"

import prisma from "@/lib/db";
import { Question, Quiz } from "@prisma/client";

export default async function addModuleAction(quiz: Quiz, questions: Question[]) {
    const { title, moduleId } = quiz;
    try {
        await prisma.quiz.create({ data: { title, module: { connect: { id: moduleId } } } })
    } catch (error) {
        console.log(error);
    }
}