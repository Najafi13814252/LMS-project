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


        const unPublishedChapter = await prisma.chapter.update({
            where: {
                id: chapterId,
                courseId
            },
            data: {
                isPublished: false
            }
        })

        const publishedChaptersInCourse = await prisma.chapter.findMany({
            where: {
                courseId,
                isPublished: true
            }
        })

        if(!publishedChaptersInCourse.length) {
            await prisma.course.update({
                where: {
                    id: courseId
                },
                data: {
                    isPublished: false
                }
            })
        }

        return Response.json(unPublishedChapter, { status: 200 })
    } catch {
        return Response.json("Internal Server Error", { status: 500 })
    }
}