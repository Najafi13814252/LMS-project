"use server"

import { Course, Purchase } from "@/lib/generated/prisma/client"
import { prisma } from "@/lib/prisma"

type PurchaseWithCourse = Purchase & {
    course: Course
}

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
    const grouped: { [courseTitle: string]: number } = {}

    purchases.forEach(purchase => {
        const courseTitle = purchase.course.title
        if (!grouped[courseTitle]) {
            grouped[courseTitle] = 0
        }
        grouped[courseTitle] += purchase.course.price!
    })

    return grouped
}

export const getAnalytics = async (userId: string) => {
    try {
        const purchases = await prisma.purchase.findMany({
            where: {
                course: {
                    userId
                }
            },
            include: {
                course: true
            }
        })

        const groupEarnings = groupByCourse(purchases)

        const data = Object.entries(groupEarnings).map(([courseTitle, total]) => ({
            name: courseTitle,
            total
        }))

        const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0)
        const totalSales = purchases.length

        return {
            data,
            totalRevenue,
            totalSales
        }
    } catch {
        return {
            data: [],
            totalRevenue: 0,
            totalSales: 0
        }
    }
}