import prisma from "@/lib/db";

export default function EnrollButton(props: any) {

    const { userId, courseId } = props;

    const enrollUser = async () => {
        "use server"
        try {
            await prisma.enrollment.create({
                data: {
                    userId: userId,
                    courseId: courseId,
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form action={enrollUser}>
            <h1>you are not enrolled in this course!</h1>
            <button type="submit" className="btn btn-primary" >Enroll</button>
        </form>
    )
}
