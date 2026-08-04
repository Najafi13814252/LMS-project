import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function PATCH(req: Request, { params }: { params: Promise<{ courseId: string, chapterId: string }> }) {
    try {
        const { userId } = await auth()
        const { courseId, chapterId } = await params
        const {isPublished, ...values} = await req.json()

        if (!userId) {
            return Response.json("Unauthorized", { status: 401 });
        }

        const courseOwner = await prisma.course.findUnique({
            where: {
                id: courseId,
                userId
            }
        })

        if (!courseOwner) {
            return Response.json("Unauthorized", { status: 401 });
        }

        const chapter = await prisma.chapter.update({
            where: {
                id: chapterId,
                courseId
            },
            data: {
                ...values
            }
        })

        return Response.json(chapter, { status: 200 })
    } catch {
        return Response.json("Internal Server Error", { status: 500 })
    }
}