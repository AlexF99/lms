'use client'

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Comment = {
    id: String,
    text: String,
    createdAt: Date,
    user: {
        name: String
    }
}

interface commentForm {
    text: string;
}

export default function Comments(props: any) {
    const { userId, lectureId } = props;
    const [comments, setComments] = useState<Comment[]>([]);
    const { register, handleSubmit, reset } = useForm<commentForm>();

    const addComment = async (comment: commentForm) => {
        const res = await (await fetch("/api/comment",
            {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: userId, lectureId: lectureId, text: comment.text })
            })).json();

        reset()
        await fetchComments();
    }

    const fetchComments = async () => {
        fetch(`/api/comment?lectureId=${lectureId}`).then(async (res) => setComments((await res.json()).comments))
    }

    useEffect(() => {
        if (userId && lectureId) {
            fetchComments();
        }

    }, [userId, lectureId])

    const dateToString = (date: Date) => {
        return new Date(date).toLocaleString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" }).toString();
    }

    return (
        <div>
            <h2 className="text-xl">Comments</h2>

            <form className="flex" onSubmit={handleSubmit((data) => addComment(data))}>
                <input type="text" {...register('text')} placeholder="type your comment" className="input  mb-2 input-bordered w-full" />
                <button className="btn btn-primary">submit</button>
            </form>

            <div className="grid grid-cols-1 divide-y">
                {comments && comments.map((c: Comment, i: number) => (
                    <div key={i}>
                        <div>
                            <span>{dateToString(c.createdAt)}</span>
                            <span className="ml-2">{c?.user?.name}:</span>
                        </div>
                        <span>{c?.text}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
