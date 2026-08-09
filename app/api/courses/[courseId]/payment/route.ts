import { auth, currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { requestPayment } from "@/lib/zarinpal"


export async function POST(
    req: Request,
    {
        params,
    }: {
        params: Promise<{ courseId: string }>
    }
) {

    try {

        // --------------------------------
        // 1. Authentication
        // --------------------------------

        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json(
                {
                    message: "Unauthorized",
                },
                {
                    status: 401,
                }
            )
        }


        // --------------------------------
        // 2. Get user
        // --------------------------------

        const user = await currentUser()

        const email =
            user?.primaryEmailAddress?.emailAddress


        // --------------------------------
        // 3. Get courseId
        // --------------------------------

        const { courseId } = await params


        // --------------------------------
        // 4. Find course
        // --------------------------------

        const course = await prisma.course.findUnique({
            where: {
                id: courseId,
            },
        })


        if (!course) {
            return NextResponse.json(
                {
                    message: "Course not found",
                },
                {
                    status: 404,
                }
            )
        }


        // --------------------------------
        // 5. Check price
        // --------------------------------

        if (!course.price) {
            return NextResponse.json(
                {
                    message: "This course is free",
                },
                {
                    status: 400,
                }
            )
        }


        // --------------------------------
        // 6. Check previous purchase
        // --------------------------------

        const existingPurchase =
            await prisma.purchase.findUnique({
                where: {
                    userId_courseId: {
                        userId,
                        courseId,
                    },
                },
            })


        if (existingPurchase) {
            return NextResponse.json(
                {
                    message: "Course already purchased",
                },
                {
                    status: 400,
                }
            )
        }


        // --------------------------------
        // 7. Callback URL
        // --------------------------------

        const callbackUrl =
            `${process.env.NEXT_PUBLIC_APP_URL}/courses/${courseId}`


        // --------------------------------
        // 9. Request payment
        // --------------------------------

        const result = await requestPayment({
            amount: course.price,
            description: `Purchase course: ${course.title}`,
            callbackUrl,
            email,
        })


        const code = result?.data?.code
        const authority = result?.data?.authority


        if (code !== 100 || !authority) {

            return NextResponse.json(
                {
                    message: "Unable to create payment",
                    code,
                    errors: result?.errors,
                },
                {
                    status: 400,
                }
            )
        }


        // --------------------------------
        // 10. Create Payment
        // --------------------------------

        await prisma.payment.create({
            data: {
                userId,
                courseId,
                amount: course.price,
                authority,
                status: "PENDING",
            },
        })


        // --------------------------------
        // 11. Payment URL
        // --------------------------------

        const paymentUrl =
            `${process.env.ZARINPAL_BASE_URL}/pg/StartPay/${authority}`


        return NextResponse.json({
            success: true,
            authority,
            paymentUrl,
        })

    } catch (error) {

        console.error("ZarinPal payment error:", error)

        return NextResponse.json(
            {
                message: "Internal server error",
            },
            {
                status: 500,
            }
        )
    }
}