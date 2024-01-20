'use client'

import RichEditor from "@/components/richEditor";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface lectureForm {
    moduleId: string;
    title: string;
    media: string;
}

export default function LectureEditor(props: any) {
    const { lectureToEdit, modules } = props;
    const { register, handleSubmit, setValue, getValues } = useForm<lectureForm>();
    const [richText, setRichText] = useState('');

    useEffect(() => {
        if (lectureToEdit !== undefined && lectureToEdit !== null && modules && modules?.length) {
            console.log(getValues());
            const keys = Object.keys(getValues());
            keys.forEach((key: any) => setValue(key, lectureToEdit[key]))
        }
    }, [props])

    const submit = async (lecture: lectureForm) => {
        if (lectureToEdit !== undefined && lectureToEdit !== null) {
            // edit
            const updated = { ...lecture, richText, id: lectureToEdit.id }
            console.log(updated);
        } else {
            // create
            const newLecture = { ...lecture, richText }
            console.log(newLecture);
            const res = await (await fetch("/api/lecture",
                {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...newLecture })
                })).json();
        }
    }

    return (
        <div>
            <form className="" onSubmit={handleSubmit((data) => submit(data))}>
                <select {...register('moduleId')} defaultValue={0} className="select select-bordered w-full mb-2">
                    <option disabled>Choose module</option>
                    {modules && modules.map((mod: any) => <option key={mod.id} value={mod.id}>{mod.title}</option>)}
                </select>
                <input type="text" {...register('title')} placeholder="Title" className="input  mb-2 input-bordered w-full" />
                <input type="text" {...register('media')} placeholder="media" className="input  mb-2 input-bordered w-full" />
                <RichEditor richtextChange={setRichText} content={lectureToEdit ? lectureToEdit.richText : ''} />
                <button className="btn btn-primary mt-2">submit</button>
            </form>
        </div>
    )
}
