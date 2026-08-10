"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import toast from "react-hot-toast"

interface CourseEnrollButtonProps {
    chapterId: string
    courseId: string
    nextChapterId: string
    isCompleted: boolean
}

function CourseProgressButton({ chapterId, courseId, isCompleted, nextChapterId }: CourseEnrollButtonProps) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const icon = isCompleted ? XCircle : CheckCircle

    const onClick = () => {
        startTransition(async () => {
            try {
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                    isComplated: !isCompleted
                })

                if(!isCompleted && nextChapterId) {
                    router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
                }

                toast.success("مشاهده فصل بروز شد")
                router.refresh()
            } catch {
                toast.error("خطایی رخ داده است")
            }
        })
    }
    return (
        <Button onClick={onClick} disabled={isPending} variant={isCompleted ? "outline" : "default"} className="w-full md:w-fit">
            <HugeiconsIcon icon={icon} className="w-4 h-4" />
            {isCompleted ? 'کامل نشده' : 'علامت زدن بعنوان کامل‌شده'}
        </Button>
    )
}

export default CourseProgressButton
