'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { upload } from "@vercel/blob/client";

interface courseForm {
    title: string;
}

type Category = {
    id: string,
    name: string,
}

export default function CourseEditor(props: any) {
    const [file, setFile] = useState<File | undefined>(undefined)
    const [fileLocalUrl, setFileLocalUrl] = useState<string>("")

    const { courseToEdit, categories } = props;
    const { register, handleSubmit, setValue, getValues } = useForm<courseForm>();
    const router = useRouter();

    const [selectedCategories, setSelectedCategories] = useState<Array<Category>>([])

    useEffect(() => {
        if (courseToEdit !== undefined && courseToEdit !== null) {
            Object.keys(getValues()).forEach((key: any) => setValue(key, courseToEdit[key]))
            setSelectedCategories(courseToEdit.categories)
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
            imageUrl = newBlob ? newBlob.url : '';
        }
        if (courseToEdit !== undefined && courseToEdit !== null) {
            // edit
            await (await fetch("/api/course",
                {
                    method: "PUT", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...course, id: courseToEdit.id, imageUrl, categories: selectedCategories.map(c => c.id) })
                })).json();
        } else {
            // create
            await (await fetch("/api/course",
                {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...course, imageUrl, categories: selectedCategories.map(c => c.id) })
                })).json();
        }
        router.push("/admin/course")
    }

    const handleFileChange = (e: any) => {
        const newFile = e.target.files?.[0]
        setFile(newFile)
        setFileLocalUrl(URL.createObjectURL(newFile))
    }

    const addCategory = (cat: Category) => {
        const currCat = [...selectedCategories]
        if (!currCat.includes(cat))
            currCat?.push(cat);

        console.log(currCat);
        setSelectedCategories(currCat);
    }

    const removeCategory = (cat: Category) => {
        const currCat = [...selectedCategories]
        setSelectedCategories(currCat.filter(c => c.id !== cat.id));
    }

    return (
        <div>
            <form className="" onSubmit={handleSubmit((data) => submit(data))}>
                <div className="columns-2 mt-4 mb-4">
                    <div className="unselected">
                        <h3 className="text-xl">unselected</h3>
                        {categories && categories.map((cat: Category) =>
                            <button type="button" className="btn btn-round" key={cat.id} onClick={() => addCategory(cat)}>{cat.name}</button>)}
                    </div>
                    <div className="selected">
                        <h3 className="text-xl">selected</h3>
                        {selectedCategories && Array.from(selectedCategories).map((cat: Category) =>
                            <button type="button" className="btn btn-round" key={cat.id} onClick={() => removeCategory(cat)}>{cat.name}</button>)}
                    </div>
                </div>
                <input type="text" {...register('title')} placeholder="Title" className="input  mb-2 input-bordered w-full" />
                <input type="file" className="file-input w-full" onChange={handleFileChange} />
                {(courseToEdit.imageUrl || file) &&
                    <div className="w-100">
                        <img src={file ? fileLocalUrl : courseToEdit.imageUrl} alt="course logo" className="object-cover w-40" />
                    </div>
                }
                <button className="btn btn-primary mt-2" type="submit">submit</button>
            </form>
            <button className="btn btn-ghost mt-2" onClick={() => router.push("/admin/course")}>cancel</button>
        </div>
    )
}
