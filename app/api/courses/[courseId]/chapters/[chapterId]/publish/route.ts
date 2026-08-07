import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function PATCH(_req: Request, { params }: { params: Promise<{ courseId: string, chapterId: string }> }) {
    try {
        const { userId } = await auth()
        const { courseId, chapterId } = await params

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

        const chapter = await prisma.chapter.findUnique({
            where: {
                id: chapterId,
                courseId
            }
        })

        if (!chapter || !chapter.title || !chapter.description || !chapter.videoUrl) {
            return Response.json("Missing required fields", { status: 400 })
        }

        const publishedChapter = await prisma.chapter.update({
            where: {
                id: chapterId,
                courseId
            },
            data: {
                isPublished: true
            }
        })

        return Response.json(publishedChapter, { status: 200 })
    } catch {
        return Response.json("Internal Server Error", { status: 500 })
    }
}