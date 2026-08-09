import Link from "next/link"

const reasonMessages: Record<string, string> = {
    missing_authority: "شناسه پرداخت یافت نشد",
    cancelled: "پرداخت توسط شما لغو شد",
    payment_not_found: "تراکنش مورد نظر یافت نشد",
    verification_failed: "تایید پرداخت با خطا مواجه شد",
    server_error: "خطای سرور در پردازش پرداخت",
}

export default async function PaymentFailedPage({
    searchParams,
}: {
    searchParams: Promise<{ reason?: string }>
}) {
    const { reason } = await searchParams
    const message =
        (reason && reasonMessages[reason]) ?? "پرداخت ناموفق بود"

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-y-4 text-center">
            <h1 className="text-2xl font-semibold text-red-600">
                پرداخت انجام نشد
            </h1>
            <p className="text-muted-foreground">{message}</p>
            <Link
                href="/"
                className="text-sky-600 hover:underline"
            >
                بازگشت به صفحه اصلی
            </Link>
        </div>
    )
}
