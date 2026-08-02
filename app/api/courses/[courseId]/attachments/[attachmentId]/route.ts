import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function DELETE(_req: Request, { params }: { params: Promise<{ courseId: string, attachmentId: string }> }) {
    try {
        const { userId } = await auth()
        const { courseId, attachmentId } = await params

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

        const attachment = await prisma.attachment.delete({
            where: {
                courseId,
                id: attachmentId
            }
        })

        return Response.json(attachment, { status: 200 })
    } catch {
        return Response.json("Internal Server Error", { status: 500 })
    }
}