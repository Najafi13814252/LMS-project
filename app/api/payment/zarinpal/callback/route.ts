import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { verifyPayment } from "@/lib/zarinpal"


export async function GET(
    request: NextRequest
) {

    try {

        // --------------------------------
        // 1. Get query params
        // --------------------------------

        const searchParams =
            request.nextUrl.searchParams

        const authority =
            searchParams.get("Authority")

        const status =
            searchParams.get("Status")


        // --------------------------------
        // 2. Validate params
        // --------------------------------

        if (!authority) {

            return NextResponse.redirect(
                new URL(
                    "/payment/failed?reason=missing_authority",
                    request.url
                )
            )
        }


        // --------------------------------
        // 3. User cancelled payment
        // --------------------------------

        if (status !== "OK") {

            await prisma.payment.updateMany({
                where: {
                    authority,
                    status: "PENDING",
                },
                data: {
                    status: "FAILED",
                },
            })

            return NextResponse.redirect(
                new URL(
                    "/payment/failed?reason=cancelled",
                    request.url
                )
            )
        }


        // --------------------------------
        // 4. Find payment
        // --------------------------------

        const payment =
            await prisma.payment.findUnique({
                where: {
                    authority,
                },
            })


        if (!payment) {
            return NextResponse.redirect(
                new URL(
                    "/payment/failed?reason=payment_not_found",
                    request.url
                )
            )
        }


        // --------------------------------
        // 5. Already successful
        // --------------------------------

        if (payment.status === "SUCCESS") {

            return NextResponse.redirect(
                new URL(
                    `/payment/success?refId=${payment.refId}`,
                    request.url
                )
            )
        }


        // --------------------------------
        // 6. Verify with ZarinPal
        // --------------------------------

        const result = await verifyPayment({
            amount: payment.amount,
            authority: payment.authority!,
        })


        const code = result?.data?.code
        const refId = result?.data?.ref_id


        // --------------------------------
        // 7. Payment successful
        // --------------------------------

        if (code === 100) {

            await prisma.$transaction(async (tx) => {

                // Update payment
                await tx.payment.update({
                    where: {
                        id: payment.id,
                    },
                    data: {
                        status: "SUCCESS",
                        refId: String(refId),
                    },
                })


                // Create purchase
                await tx.purchase.upsert({
                    where: {
                        userId_courseId: {
                            userId: payment.userId,
                            courseId: payment.courseId,
                        },
                    },
                    update: {},
                    create: {
                        userId: payment.userId,
                        courseId: payment.courseId,
                    },
                })

            })


            return NextResponse.redirect(
                new URL(
                    `/payment/success?refId=${refId}`,
                    request.url
                )
            )
        }


        // --------------------------------
        // 8. Already verified
        // --------------------------------

        if (code === 101) {

            await prisma.payment.update({
                where: {
                    id: payment.id,
                },
                data: {
                    status: "SUCCESS",
                },
            })


            return NextResponse.redirect(
                new URL(
                    `/payment/success?refId=${payment.refId ?? ""}`,
                    request.url
                )
            )
        }


        // --------------------------------
        // 9. Failed
        // --------------------------------

        await prisma.payment.update({
            where: {
                id: payment.id,
            },
            data: {
                status: "FAILED",
            },
        })


        return NextResponse.redirect(
            new URL(
                `/payment/failed?reason=verification_failed`,
                request.url
            )
        )

    } catch (error) {

        console.error(
            "ZarinPal callback error:",
            error
        )

        return NextResponse.redirect(
            new URL(
                "/payment/failed?reason=server_error",
                request.url
            )
        )
    }
}