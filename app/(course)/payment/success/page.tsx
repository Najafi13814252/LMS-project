import Link from "next/link"

async function PaymentSuccessPage({ searchParams }: { searchParams: Promise<{ refId: string }> }) {
    const { refId } = await searchParams
    return (
        <div className="flex flex-col items-center justify-center h-full gap-y-4 text-center">
            <h1 className="text-2xl font-semibold text-emerald-600">پرداخت با موفقیت انجام شد</h1>
            {refId && (
                <p className="text-muted-foreground">کد پیگیری: {refId}</p>
            )}
            <Link href="/" className="text-sky-600 hover:underline">
            بازگشت به صفحه اصلی
            </Link>
        </div>
    )
}

export default PaymentSuccessPage
