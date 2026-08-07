import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function PATCH(_req: Request, { params }: { params: Promise<{ courseId: string }> }) {
    try {
        const { userId } = await auth()
        const { courseId } = await params

        if (!userId) {
            return Response.json("Unauthorized", { status: 401 });
        }

        const course = await prisma.course.findUnique({
            where: {
                id: courseId,
                userId
            }
        })

        if (!course) {
            return Response.json("Unauthorized", { status: 401 });
        }


        const unPublishedCourse = await prisma.course.update({
            where: {
                id: courseId,
                userId
            },
            data: {
                isPublished: false
            }
        })

        return Response.json(unPublishedCourse, { status: 200 })
    } catch {
        return Response.json("Internal Server Error", { status: 500 })
    }
}