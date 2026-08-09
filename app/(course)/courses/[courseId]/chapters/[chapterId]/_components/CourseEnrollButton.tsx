"use client"

import { Button } from "@/components/ui/button"
import axios from "axios"
import { useTransition } from "react"
import { toast } from "sonner"

interface CourseEnrollButtonProps {
    courseId: string
    price: number
}

function CourseEnrollButton({ courseId, price }: CourseEnrollButtonProps) {
    const [isPending, startTransition] = useTransition()

    const handlePayment = () => {
        startTransition(async () => {
            try {
                const response = await axios.post(`/api/courses/${courseId}/payment`)

            const data = await response.data

            window.location.href = data.paymentUrl
            } catch {
                toast.error('خطا در ایجاد پرداخت')
            }
        })
    }
    return (
        <Button disabled={isPending} onClick={handlePayment} className="w-full md:w-fit"> 
            {isPending ? 'درحال انتقال به صفحه پرداخت...' : `${price.toLocaleString('fa-ir')} تومان`}
        </Button>
    )
}

export default CourseEnrollButton
