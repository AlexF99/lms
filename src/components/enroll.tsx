'use client'
import { useRouter } from "next/navigation";

export default function EnrollButton(props: any) {
    const router = useRouter();

    const { userId, courseId } = props;

    const enrollUser = async () => {
        const res = await (await fetch("/api/enrollment",
            {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: userId, courseId: courseId })
            })).json();
        router.refresh();
    }

    return (
        <div>
            <h1>you are not enrolled in this course!</h1>
            <button className="btn btn-primary" onClick={enrollUser} >Enroll</button>
        </div>
    )
}
