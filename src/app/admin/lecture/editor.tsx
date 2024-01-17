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

export default function LectureEditor(props: any) {
    const { userId, lectureId } = props;
    const [comments, setComments] = useState<Comment[]>([]);
    const { register, handleSubmit, reset } = useForm<commentForm>();

    const submit = async (comment: commentForm) => {
        // check if it's existing or new lecture
    }

    return (
        <div>
            <form className="" onSubmit={handleSubmit((data) => submit(data))}>
                <input type="text" {...register('text')} placeholder="Title" className="input  mb-2 input-bordered w-full" />
                <button className="btn btn-primary">submit</button>
            </form>
        </div>
    )
}
