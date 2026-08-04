import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request, { params }: { params: Promise<{ courseId: string }> }) {
    try {
        const { userId } = await auth()
        const { courseId } = await params
        const { title } = await req.json()

        // چک وجود کاربر 
        if (!userId) {
            return Response.json("Unauthorized", { status: 401 });
        }

        // چک مالکیت دوره (کدام دوره و برای چه کاربری است؟) 
        // چک وجود دوره 
        const courseOwner = await prisma.course.findUnique({
            where: {
                id: courseId,
                userId
            }
        })

        if (!courseOwner) {
            return Response.json("Unauthorized", { status: 401 });
        }

        // محاسبه موقعیت آخرین فصل 
        const lastChapter = await prisma.chapter.findFirst({
            where: {
                courseId
            },
            orderBy: {
                position: 'desc'
            }
        })

        //برای اینکه فصل جدید همیشه در انتهای لیست بیاید 
        const newPosition = lastChapter ? lastChapter.position + 1 : 1

        const chapter = await prisma.chapter.create({
            data: {
                title,
                courseId,
                position: newPosition
            }
        })

        return Response.json(chapter, { status: 200 })
    } catch {
        return Response.json("Internal Server Error", { status: 500 })
    }
}