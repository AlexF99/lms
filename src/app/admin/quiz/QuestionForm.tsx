'use client'

import FormInput from "@/components/FormInput";
import { UseFormRegister } from "react-hook-form";

interface QuestionFormType {
    text: string
}

const QuestionForm = ({ register, questionTs }: { register: UseFormRegister<any>, questionTs: string }) => {
    return (
        <>
            <h1>Question</h1>
            <FormInput register={register}
                inputName={`${questionTs}.text`}
                props={{ placeholder: "Question text", className: "input  mb-2 input-bordered w-full" }} />
        </>
    )
}
export default QuestionForm;