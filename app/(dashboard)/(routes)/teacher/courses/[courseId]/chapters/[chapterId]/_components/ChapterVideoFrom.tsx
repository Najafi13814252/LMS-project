"use client"

import { Button } from "@/components/ui/button"
import { Chapter } from "@/lib/generated/prisma/client"
import { chapterVideoSchema } from "@/schemas/create-course"
import { Edit, PlusSignCircleIcon, Video } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import z from "zod"
import Uploader from "@/components/custom/Uploader"

interface ChapterVideoFormProps {
    initialData: Chapter
    courseId: string
    chapterId: string
}

function ChapterVideoForm({ initialData, courseId, chapterId }: ChapterVideoFormProps) {
    const [isEditting, setIsEditting] = useState(false)
    const router = useRouter()

    const toggleEdit = () => setIsEditting(current => !current)

    async function onSubmit(values: z.infer<typeof chapterVideoSchema>) {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
            toast.success("دوره با موفقیت بروز شد")
            toggleEdit()
            router.refresh()
        } catch {
            toast.error("خطایی رخ داده است")
        }
    }
    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between mb-2">
                ویدئو دوره
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditting && (
                        <>لغو</>
                    )}
                    {!isEditting && !initialData.videoUrl && (
                        <>
                            <HugeiconsIcon icon={PlusSignCircleIcon} className="h-4 w-4" />
                            افزودن ویدئو
                        </>
                    )}
                    {!isEditting && initialData.videoUrl && (
                        <>
                            <HugeiconsIcon icon={Edit} className="h-4 w-4" />
                            ویرایش ویدئو
                        </>
                    )}
                </Button>
            </div>
            {!isEditting ? (
                !initialData.videoUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <HugeiconsIcon icon={Video} className="w-10 h-10 text-slate-500" />
                    </div>
                ) : (
                    <video
                        src={initialData.videoUrl}
                        controls
                        className="aspect-video w-full h-full rounded-md "
                    />
                )
            ) : (
                <div>
                    <Uploader
                        endpoint="chapterVideo"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ videoUrl: url })
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        ویدئوی این فصل را آپلود کنید
                    </div>
                </div>
            )}
            {initialData.videoUrl && !isEditting && (
                <div className="text-xs text-muted-foreground mt-4">پردازش ویدئو‌ها میتواند چند دقیقه طول بکشد. اگر ویدئو ظاهر نشد صفحه را refresh کنید</div>
            )}
        </div>
    )
}

export default ChapterVideoForm
