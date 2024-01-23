'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface lectureForm {
    moduleId: string;
    title: string;
    media: string;
}

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

export default function LectureEditor(props: any) {
    const { lectureToEdit, modules } = props;
    const { register, handleSubmit, setValue, getValues } = useForm<lectureForm>();
    const initialContent = lectureToEdit ? lectureToEdit.richText : '';
    const [richText, setRichText] = useState(initialContent);
    const router = useRouter();

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
            await (await fetch("/api/lecture",
                {
                    method: "PUT", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...updated })
                })).json();
        } else {
            // create
            const newLecture = { ...lecture, richText }
            await (await fetch("/api/lecture",
                {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...newLecture })
                })).json();
        }
        router.push("/admin/lecture")
    }


    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            [{ align: [] }],
            [{ color: [] }],
            ['code-block'],
            ['clean'],
        ],
    };

    const quillFormats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        'image',
        'align',
        'color',
        'code-block',
    ];

    return (
        <div>
            <form className="" onSubmit={handleSubmit((data) => submit(data))}>
                <select {...register('moduleId')} defaultValue={0} className="select select-bordered w-full mb-2">
                    <option disabled>Choose module</option>
                    {modules && modules.map((mod: any) => <option key={mod.id} value={mod.id}>{mod.title}</option>)}
                </select>
                <input type="text" {...register('title')} placeholder="Title" className="input  mb-2 input-bordered w-full" />
                <input type="text" {...register('media')} placeholder="media" className="input  mb-2 input-bordered w-full" />
                <QuillEditor
                    value={richText}
                    onChange={(newContent) => setRichText(newContent)}
                    modules={quillModules}
                    formats={quillFormats}
                    className="w-full h-[70%] mt-10 bg-white"
                />
                <button className="btn btn-primary mt-2">submit</button>
            </form>
        </div>
    )
}
