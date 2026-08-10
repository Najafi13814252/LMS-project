"use server"

import { Course, Category, Chapter } from "@/lib/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { getProgress } from "./get-progress"

type CourseWithProgressWithCategory = Course & {
    category: Category
    chapters: Chapter[]
    progress: number | null
}

type DashboardCourses = {
    completedCourses: CourseWithProgressWithCategory[]
    coursesInProgress: CourseWithProgressWithCategory[]
}

export const getDashboardCourses = async (userId: string): Promise<DashboardCourses> => {
    try {
        const purchasedCourses = await prisma.purchase.findMany({
            where: {
                userId
            },
            select: {
                course: {
                    include: {
                        category: true,
                        chapters: {
                            where: {
                                isPublished: true
                            }
                        }
                    }
                }
            }
        })

        const courses = purchasedCourses.map(purchase => purchase.course as CourseWithProgressWithCategory)

        for (const course of courses) {
            const progress = await getProgress(userId, course.id)
            course["progress"] = progress
        }

        const completedCourses = courses.filter(course => course.progress === 100)
        const coursesInProgress = courses.filter(course => (course.progress ?? 0) < 100)

        return {
            completedCourses,
            coursesInProgress
        }
    } catch {
        return {
            completedCourses: [],
            coursesInProgress: []
        }
    }
}