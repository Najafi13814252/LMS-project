import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request, { params }: { params: Promise<{ courseId: string }> }) {
    try {
        const { userId } = await auth()
        const { courseId } = await params
        const { url } = await req.json()

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

        const attachment = await prisma.attachment.create({
            data: {
                url,
                name: url.split("/").pop(),
                courseId
            }
        })

        return Response.json(attachment, { status: 200 })
    } catch {
        return Response.json("Internal Server Error", { status: 500 })
    }
}