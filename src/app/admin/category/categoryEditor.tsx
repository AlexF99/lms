import prisma from "@/lib/db"

export default function CategoryEditor(props: any) {
    const { categoryToEdit } = props;

    const submit = async (formData: FormData) => {
        'use server'
        const name: any = formData.get("name") ? formData.get("name") : '';

        if (!!categoryToEdit) {
            await prisma.courseCategory.update({
                where: { id: `${categoryToEdit?.id}` },
                data: { name }
            })
        } else
            await prisma.courseCategory.create({ data: { name } })
    }

    return (
        <form action={submit}>
            <input type="text" className="input  mb-2 input-bordered w-full" name="name" placeholder="name" defaultValue={!!categoryToEdit ? categoryToEdit.name : ''} />
            <button className="btn btn-primary">save</button>
        </form>
    )
}