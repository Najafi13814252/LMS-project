"use server"

import { Attachment, Chapter } from "@/lib/generated/prisma/client"
import { prisma } from "@/lib/prisma"

interface GetChapterProps {
    userId: string
    courseId: string
    chapterId: string
}

export const getChapter = async ({ userId, courseId, chapterId }: GetChapterProps) => {
    try {
        const purchase = await prisma.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId
                }
            }
        })

        const course = await prisma.course.findUnique({
            where: {
                id: courseId,
                isPublished: true
            },
            select: {
                price: true
            }
        })

        const chapter = await prisma.chapter.findUnique({
            where: {
                id: chapterId,
                isPublished: true
            }
        })

        if (!chapter || !course) {
            throw new Error("Chapter or course not found")
        }

        let attachment: Attachment[] = []
        let nextChapter: Chapter | null = null


        if (purchase) {
            attachment = await prisma.attachment.findMany({
                where: {
                    courseId
                }
            })
        }

        if (chapter.isFree || purchase) {
            nextChapter = await prisma.chapter.findFirst({
                where: {
                    courseId,
                    isPublished: true,
                    position: {
                        gt: chapter?.position
                    }
                },
                orderBy: {
                    position: "asc"
                }
            })
        }

        const userProgress = await prisma.userProgress.findUnique({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId
                }
            }
        })

        return {
            chapter,
            course,
            attachment,
            nextChapter,
            userProgress,
            purchase
        }


    } catch {
        return {
            chapter: null,
            course: null,
            attachment: [],
            nextChapter: null,
            userProgress: null,
            purchase: null
        }
    }
}