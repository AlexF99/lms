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
                    <form>
                        {questions && questions.map(q => (
                            <div key={q.id}>
                                {q.text}
                                <ul>
                                    {q.choice && q.choice.map(c => (
                                        <li key={c.id}>{c.text}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </form>
                </div>
            </div>
        )
    } catch (err) {
        return <h1>Could not load lecture</h1>
    }
}