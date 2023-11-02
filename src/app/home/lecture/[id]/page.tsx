import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db"
import { getServerSession } from "next-auth";

export default async function Page({ params }: { params: { id: string } }) {
    try {
        const loggedUser = (await getServerSession(authOptions))?.user;

        const lecture = await prisma.lecture.findUniqueOrThrow({
            where: {
                id: params.id
            }
        })

        const comments = await prisma.comment.findMany({
            where: {
                lectureId: params.id
            },
            select: { user: true, text: true, createdAt: true },
            orderBy: {createdAt: "desc"}
        })

        if (!lecture) return <h1>Could not find lecture!</h1>

        return (
            <div>
                <h1 className="text-xl text-center">{lecture?.title}</h1>
                <div className="mt-3">
                    {lecture.media &&
                        <iframe
                            width="853"
                            height="480"
                            src={`https://www.youtube.com/embed/${lecture.media}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                        />
                    }

                </div>
                <div>
                    <h2 className="text-xl">comments</h2>
                    <div className="grid grid-cols-1 divide-y">
                        {comments && comments.map((c, i) => (
                            <div key={i}>
                                <div>
                                    <span>{c.createdAt.toLocaleString()}</span>
                                    <span>{c.user.name}:</span>
                                </div>
                                <span>{c.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    } catch (err) {
        return <h1>Could not load lecture</h1>
    }
}