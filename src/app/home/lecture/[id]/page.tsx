import Comments from "@/components/comments";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db"
import { getServerSession } from "next-auth";

import DOMPurify from "isomorphic-dompurify";

export default async function Page({ params }: { params: { id: string } }) {
    try {
        const loggedUser = (await getServerSession(authOptions))?.user;

        const lecture = await prisma.lecture.findUniqueOrThrow({
            where: {
                id: params.id
            }
        })

        if (!lecture) return <h1>Could not find lecture!</h1>

        const cleanRichText = DOMPurify.sanitize(lecture.richText)

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
                <div dangerouslySetInnerHTML={{ __html: cleanRichText }}></div>
                <div>
                    {params.id && loggedUser?.id
                        ? (<Comments lectureId={params.id} userId={loggedUser?.id} />)
                        : (<div>No Comments</div>)}
                </div>
            </div>
        )
    } catch (err) {
        return <h1>Could not load lecture</h1>
    }
}