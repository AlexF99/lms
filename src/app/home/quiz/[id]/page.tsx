import QuizForm from "@/components/quizForm";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db"
import { getServerSession } from "next-auth";

export default async function Page({ params }: { params: { id: string } }) {
    try {
        const loggedUser = (await getServerSession(authOptions))?.user;

        const quiz = await prisma.quiz.findUniqueOrThrow({
            where: {
                id: params.id
            },
            select: {
                title: true,
                Question: {
                    select: {
                        id: true,
                        text: true,
                        choice: true
                    }
                }
            }
        })

        const questions = quiz.Question;

        if (!quiz) return <h1>Could not find quiz!</h1>

        return (
            <div>
                <h1 className="text-xl text-center">{quiz?.title}</h1>

                <div className="mt-3">
                    {loggedUser && quiz &&
                        <QuizForm quiz={{ ...quiz, id: params.id }} userId={loggedUser.id}></QuizForm>
                    }
                </div>
            </div>
        )
    } catch (err) {
        return <h1>Could not load quiz</h1>
    }
}