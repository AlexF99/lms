'use client'

import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface PropType {
    userId: string,
    quiz: {
        id: string;
        title: string;
        Question: {
            id: string;
            text: string;
            choice: {
                id: string;
                questionId: string;
                text: string;
                isCorrect: boolean;
            }[];
        }[];
    }
}

export default function QuizForm(props: PropType) {
    const { userId, quiz } = props;
    const { register, handleSubmit, reset } = useForm<any>();

    const addAnswer = async (answer: any) => {
        console.log(answer)
    }

    useEffect(() => {
        if (quiz) {
            console.log(quiz);
        }
    }, [quiz])

    return (
        <div>
            <form onSubmit={handleSubmit((data) => addAnswer(data))}>
                {quiz.Question && quiz.Question.map(q => (
                    <div key={q.id}>
                        {q.text}
                        {q.choice && q.choice.map((c, i: number) => (
                            <label key={c.id} className="label cursor-pointer justify-normal">
                                <input {...register(q.id)} type="radio" name={q.id} value={c.id} className="radio mr-2" defaultChecked={false} />
                                <span className="label-text">{c.text}</span>
                            </label>
                        ))}
                    </div>
                ))}

                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
