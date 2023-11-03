import Comments from "@/components/comments";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db"
import { getServerSession } from "next-auth";

export default async function Page({ params }: { params: { id: string } }) {
    try {
        const loggedUser = (await getServerSession(authOptions))?.user;

        const quiz = await prisma.quiz.findUniqueOrThrow({
            where: {
                id: params.id
            }
        })

        if (!quiz) return <h1>Could not find quiz!</h1>

        return (
            <div>
                <h1 className="text-xl text-center">{quiz?.title}</h1>
                <div className="mt-3">

                </div>
            </div>
        )
    } catch (err) {
        return <h1>Could not load lecture</h1>
    }
}