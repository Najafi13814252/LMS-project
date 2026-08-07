"use client"

import ConfirmModal from "@/components/modals/ConfirmModal"
import { Button } from "@/components/ui/button"
import { Trash } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import toast from "react-hot-toast"

interface ChapterActionsProps {
    disabled: boolean
    courseId: string
    isPublished: boolean
}

function CourseActions({ disabled, courseId, isPublished }: ChapterActionsProps) {
    const [isPending, startTransition] = useTransition()

    const router = useRouter()

    const onPublish = () => {
        startTransition(async () => {
            try {
                if (isPublished) {
                    await axios.patch(`/api/courses/${courseId}/unpublish`)
                    toast.success("دوره با موفقیت از انتشار حذف شد")
                } else {
                    await axios.patch(`/api/courses/${courseId}/publish`)
                    toast.success("دوره با موفقیت منتشر شد")
                }

                router.refresh()
            } catch {
                toast.error("خطایی رخ داده است")
            }
        })
    }

    const onDelete = () => {
        startTransition(async () => {
            try {
                await axios.delete(`/api/courses/${courseId}`)
                toast.success("دوره با موفقیت حذف گردید")
                router.refresh()
                router.push(`/teacher/courses`)
            } catch {
                toast.error("خطایی رخ داده است")
            }
        })
    }
    return (
        <div className="flex items-center gap-x-2">
            <Button onClick={onPublish} disabled={disabled || isPending} size="sm" variant="outline">
                {isPublished ? "عدم انتشار" : "انتشار دوره"}
            </Button>
            <ConfirmModal onConfirm={onDelete} disabled={isPending} source="دوره">
                <Button size="sm">
                    <HugeiconsIcon icon={Trash} className="w-4 h-4" />
                </Button>
            </ConfirmModal>

        </div>
    )
}

export default CourseActions
