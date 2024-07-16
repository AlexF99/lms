'use client'

import { Question } from "@prisma/client";
import { useForm } from "react-hook-form";
import QuestionForm from "./QuestionForm";
import { useState } from "react";

interface QuizForm {
    title: string,
    questions: Question[],
}

const QuizEditor = () => {
    const { register, handleSubmit, getValues, watch, reset } = useForm<QuizForm>({
        defaultValues: {
            questions: [{ text: 'oi?', id: `${new Date()}`  }]
        }
    });

    const addQuestion = () => {
        const formCurrentValues = getValues();
        reset({ ...formCurrentValues, questions: [...formCurrentValues.questions, { text: "new question", id: `${new Date()}` }] })
    }

    const submit = handleSubmit((formData) => {
        console.log(formData);

    })

    const questions = watch('questions')

    return (
        <form className="" onSubmit={submit}>
            <input type="text" name="title" placeholder="Title" className="input  mb-2 input-bordered w-full" />
            {questions.map(q => (
                <QuestionForm key={q.id} register={register} questionTs={q.id} />
            ))
            }
            <button className="btn btn-primary mt-2" type="button" onClick={() => addQuestion()}>add question</button>
            <button className="btn btn-primary mt-2" type="submit">submit</button>
        </form>
    )
}
export default QuizEditor;