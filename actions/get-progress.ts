"use server"

import { prisma } from "@/lib/prisma"

export const getProgress = async (userId: string, courseId: string) => {
try {
    const publishedChapters = await prisma.chapter.findMany({
        where: {
            courseId,
            isPublished: true
        },
        select: {
            id: true
        }
    })

    const publishedChapterIds = publishedChapters.map(chapter => chapter.id)

    const validCompletedChapters = await prisma.userProgress.count({
        where: {
            userId,
            chapterId: {
                in: publishedChapterIds
            },
            isComplated: true
        }
    })

    const progressPercentage = (validCompletedChapters / publishedChapterIds.length) * 100

    return progressPercentage
} catch {
    return 0
}
}