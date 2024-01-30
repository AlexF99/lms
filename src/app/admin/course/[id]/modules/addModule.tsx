"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import addModuleAction from "./addModuleAction";

interface moduleForm {
    title: string;
}

export default function AddModule(props: any) {
    const { courseId } = props;
    const [formActive, setFormActive] = useState<boolean>(false)
    const { register, handleSubmit } = useForm<moduleForm>();
    const router = useRouter();

    const submit = async (mod: moduleForm) => {
        await addModuleAction({ ...mod, courseId })
        router.refresh();
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={() => setFormActive(true)}>add module</button>
            {formActive && (
                <form onSubmit={handleSubmit((data) => submit(data))} className="flex">
                    <input type="text" {...register('title')} placeholder="Title" className="input  mb-2 input-bordered w-full" />
                    <button type="submit" className="btn btn-secondary ml-5">add</button>
                </form>
            )}
        </div>
    )
}