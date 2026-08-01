import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
    try {
        const { userId } = await auth()
        const { title } = await req.json()

        if (!userId) {
            return Response.json("Unauthorized", { status: 401 });
        }

        const course = await prisma.course.create({
            data: {
                userId,
                title
            }
        })

        return Response.json(course, {status: 201})
    } catch {
        return Response.json("Internal Server Error", { status: 500 })
    }
}