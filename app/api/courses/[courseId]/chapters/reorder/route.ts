import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function PUT(req: Request, { params }: { params: Promise<{ courseId: string }> }) {
    try {
        const { userId } = await auth()
        const { courseId } = await params
        const { list } = await req.json()

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

        for (const item of list) {
            await prisma.chapter.update({
                where: { id: item.id },
                data: {position: item.position}
            })
        }

        return Response.json("Success", { status: 200 })
    } catch {
        return Response.json("Internal Server Error", { status: 500 })
    }
}