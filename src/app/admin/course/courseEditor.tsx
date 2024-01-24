'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { put } from "@vercel/blob";
import { upload } from "@vercel/blob/client";

interface courseForm {
    categoryId: string;
    title: string;
}

export default function CourseEditor(props: any) {
    const [file, setFile] = useState<File | undefined>(undefined)

    const { courseToEdit, categories } = props;
    const { register, handleSubmit, setValue, getValues } = useForm<courseForm>();
    const router = useRouter();

    useEffect(() => {
        if (courseToEdit !== undefined && courseToEdit !== null) {
            const keys = Object.keys(getValues());
            keys.forEach((key: any) => setValue(key, courseToEdit[key]))
            if (courseToEdit.categories?.length && courseToEdit.categories[0])
                setValue("categoryId", courseToEdit.categories[0].id)
        }
    }, [props])

    const submit = async (course: courseForm) => {
        let newBlob;
        let imageUrl
        if (file && file !== undefined) {
            newBlob = await upload(file.name, file, {
                access: 'public',
                handleUploadUrl: '/api/blob/upload',
            });
            console.log(newBlob)
            imageUrl = newBlob ? newBlob.url : '';
        }
        if (courseToEdit !== undefined && courseToEdit !== null) {
            // edit
            await (await fetch("/api/course",
                {
                    method: "PUT", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...course, id: courseToEdit.id, imageUrl })
                })).json();
        } else {
            // create
            await (await fetch("/api/course",
                {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...course, imageUrl })
                })).json();
        }
        router.push("/admin/course")
    }

    useEffect(() => { console.log(file) }, [file])

    const handleFileChange = (e: any) => {
        setFile(e.target.files?.[0])
    }

    return (
        <div>
            <form className="" onSubmit={handleSubmit((data) => submit(data))}>
                <select {...register('categoryId')} defaultValue={0} className="select select-bordered w-full mb-2">
                    <option disabled>Choose category</option>
                    {categories && categories.map((mod: any) => <option key={mod.id} value={mod.id}>{mod.name}</option>)}
                </select>
                <input type="text" {...register('title')} placeholder="Title" className="input  mb-2 input-bordered w-full" />
                <input type="file" className="file-input w-full max-w-xs" onChange={handleFileChange} />
                <button className="btn btn-primary mt-2">submit</button>
            </form>
        </div>
    )
}
