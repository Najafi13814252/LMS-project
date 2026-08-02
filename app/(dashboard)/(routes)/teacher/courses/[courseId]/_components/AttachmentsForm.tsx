"use client"

import { Button } from "@/components/ui/button"
import { Attachment, Course } from "@/lib/generated/prisma/client"
import { attachmentCourseSchema } from "@/schemas/create-course"
import { File, Loader, PlusSignCircleIcon, Trash } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import z from "zod"
import Uploader from "@/components/custom/Uploader"

interface AttachmentFormProps {
    initialData: Course & { attachment: Attachment[] }
    courseId: string
}

function AttachmentsForm({ initialData, courseId }: AttachmentFormProps) {
    const [isEditting, setIsEditting] = useState(false)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const router = useRouter()

    const toggleEdit = () => setIsEditting(current => !current)

    async function onSubmit(values: z.infer<typeof attachmentCourseSchema>) {
        try {
            await axios.post(`/api/courses/${courseId}/attachments`, values)
            toast.success("دوره با موفقیت بروز شد")
            toggleEdit()
            router.refresh()
        } catch {
            toast.error("خطایی رخ داده است")
        }
    }

    const onDelete = async (id: string) => {
        try {
            setDeletingId(id)
            await axios.delete(`/api/courses/${courseId}/attachments/${id}`)
            toast.success("پیوست دوره با موفقیت بروز شد")
            router.refresh()
        } catch {
            toast.error("خطایی رخ داده است")
        } finally {
            setDeletingId(null)
        }
    }
    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between mb-2">
                پیوست دوره
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditting && (
                        <>لغو</>
                    )}
                    {!isEditting && (
                        <>
                            <HugeiconsIcon icon={PlusSignCircleIcon} className="h-4 w-4" />
                            افزودن پیوست
                        </>
                    )}
                </Button>
            </div>
            {!isEditting ? (
                <>
                    {initialData.attachment.length === 0 && (
                        <p className="text-sm text-slate-500 italic">پیوستی وجود ندارد</p>
                    )}
                    {initialData.attachment.length > 0 && (
                        <div className="space-y-2">
                            {initialData.attachment.map(attach => (
                                <div key={attach.id} className="flex items-center justify-between p-3 w-full bg-lime-50 border border-dashed border-lime-500 text-lime-700 rounded-md">
                                    <div className="flex items-center gap-x-2">
                                        <HugeiconsIcon icon={File} className="w-4 h-4 shrink-0" />
                                        <p className="text-xs line-clamp-1">{attach.name}</p>
                                    </div>
                                    {deletingId === attach.id ? (
                                        <div>
                                            <HugeiconsIcon icon={Loader} className="w-4 h-4 animate-spin" />
                                        </div>
                                    ) : (
                                        <button onClick={() => onDelete(attach.id)}>
                                            <HugeiconsIcon icon={Trash} className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div>
                    <Uploader
                        endpoint="courseAttachment"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ url: url })
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        هر چیزی که دانش‌آموزانتان برای تکمیل دوره نیاز دارند را اضافه کنید
                    </div>
                </div>
            )}
        </div>
    )
}

export default AttachmentsForm
