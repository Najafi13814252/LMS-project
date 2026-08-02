"use client"

import { Button } from "@/components/ui/button"
import { Course } from "@/lib/generated/prisma/client"
import {  imageCourseSchema } from "@/schemas/create-course"
import { Edit, ImageIcon, PlusSignCircleIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import Image from 'next/image'
import z from "zod"
import Uploader from "@/components/custom/Uploader"

interface ImageFormProps {
    initialData: Course
    courseId: string
}

function ImageForm({ initialData, courseId }: ImageFormProps) {
    const [isEditting, setIsEditting] = useState(false)
    const router = useRouter() 

    const toggleEdit = () => setIsEditting(current => !current)

    async function onSubmit (values: z.infer<typeof imageCourseSchema>) {
        try {
                await axios.patch(`/api/courses/${courseId}`, values)
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
                تصویر دوره
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditting && (
                        <>لغو</>
                    )}
                    {!isEditting && !initialData.imageUrl && (
                        <>
                            <HugeiconsIcon icon={PlusSignCircleIcon} className="h-4 w-4" />
                            افزودن تصویر
                        </>
                    )}
                    {!isEditting && initialData.imageUrl && (
                        <>
                            <HugeiconsIcon icon={Edit} className="h-4 w-4" />
                            ویرایش تصویر
                        </>
                    )}
                </Button>
            </div>
            {!isEditting ? (
                !initialData.imageUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <HugeiconsIcon icon={ImageIcon} className="w-10 h-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video">
                        <Image src={initialData?.imageUrl} fill className="object-cover rounded-md" alt="Upload" />
                    </div>
                )
            ) : (
                <div>
                    <Uploader
                        endpoint="courseImage"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ imageUrl: url })
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        ابعاد 16:9 توصیه میشود
                    </div>
                </div>
            )}
        </div>
    )
}

export default ImageForm
