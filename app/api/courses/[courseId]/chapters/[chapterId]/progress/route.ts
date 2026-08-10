import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function PUT(req: Request, { params }: { params: Promise<{ chapterId: string }> }) {
    try {
        const { userId } = await auth()
        const { chapterId } = await params
        const { isComplated } = await req.json()

        if (!userId) {
            return Response.json("Unauthorized", { status: 401 });
        }

        const userProgress = await prisma.userProgress.upsert({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId
                }
            },
            update: {
                isComplated
            },
            create: {
                userId,
                chapterId,
                isComplated
            }
        })

        return Response.json(userProgress, { status: 200 })
    } catch {
        return Response.json("Internal Server Error", { status: 500 })
    }
}