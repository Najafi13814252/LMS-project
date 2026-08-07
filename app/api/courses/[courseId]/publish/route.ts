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
            },
            include: {
                chapters: {}
            }
        })

        if (!course) {
            return Response.json("Unauthorized", { status: 401 });
        }

        const hasPublishedChapter = course.chapters.some(chapter => chapter.isPublished)

        if (!course.title || !course.description || !course.categoryId || !course.imageUrl || !hasPublishedChapter) {
            return Response.json("Missing required fields", { status: 401 })
        }

        const publishedCourse = await prisma.course.update({
            where: {
                id: courseId,
                userId
            },
            data: {
                isPublished: true
            }
        })

        return Response.json(publishedCourse, { status: 200 })
    } catch {
        return Response.json("Internal Server Error", { status: 500 })
    }
}