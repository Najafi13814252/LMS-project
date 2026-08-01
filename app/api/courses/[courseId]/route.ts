import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function PATCH(req: Request, { params }: { params: Promise<{ courseId: string }> }) {
    try {
        const { userId } = await auth()
        const { courseId } = await params
        const values = await req.json()

        if (!userId) {
            return Response.json("Unauthorized", { status: 401 });
        }

        const course = await prisma.course.update({
            where: {
                id: courseId,
                userId
            },
            data: {
                ...values
            }
        })

        return Response.json(course, { status: 200 })
    } catch {
        return Response.json("Internal Server Error", { status: 500 })
    }
}