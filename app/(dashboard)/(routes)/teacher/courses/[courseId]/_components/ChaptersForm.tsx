"use client"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Chapter, Course } from "@/lib/generated/prisma/client"
import { cn } from "@/lib/utils"
import { chapterCourseSchema } from "@/schemas/create-course"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader, PlusSignCircleIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import axios from "axios"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import z from "zod"
const ChaptersList = dynamic(() => import("./ChaptersList"), { ssr: false })

interface ChaptersFormProps {
    initialData: Course & { chapters: Chapter[] }
    courseId: string
}

function ChaptersForm({ initialData, courseId }: ChaptersFormProps) {
    const [isCreating, setIsCreating] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const router = useRouter()

    const [isPending, startTransition] = useTransition()
    const form = useForm({
        resolver: zodResolver(chapterCourseSchema),
        defaultValues: {
            title: ""
        }
    })

    const toggleCreating = () => {
        setIsCreating(current => !current)
    }

    function onSubmit(values: z.infer<typeof chapterCourseSchema>) {
        startTransition(async () => {
            try {
                await axios.post(`/api/courses/${courseId}/chapters`, values)
                toast.success("دوره با موفقیت بروز شد")
                toggleCreating()
                router.refresh()
            } catch {
                toast.error("خطایی رخ داده است")
            }
        })
    }

    const onReorder = async (updateDate: { id: string, position: number }[]) => {
        try {
            setIsUpdating(true)
            await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
                list: updateDate
            })
            toast.success("فصل‌های دوره با موفقیت مرتب شدند")
            router.refresh()
        } catch {
            toast.error("خطایی رخ داده است")
        } finally {
            setIsUpdating(false)
        }
    }

    const onEdit = (id: string) => {
        router.push(`/teacher/courses/${courseId}/chapters/${id}`)
    }
    return (
        <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
            {isUpdating && (
                <div className="absolute h-full w-full bg-slate-500/20 top-0 left-0 rounded-md flex items-center justify-center">
                    <HugeiconsIcon icon={Loader} className="animate-spin w-6 h-6 text-lime-700" />
                </div>
            )}
            <div className="font-medium flex items-center justify-between">
                فصل‌های دوره
                <Button variant="ghost" onClick={toggleCreating}>
                    {isCreating ? (
                        <>لغو</>
                    ) : (
                        <>
                            <HugeiconsIcon icon={PlusSignCircleIcon} className="h-4 w-4" />
                            یک فصل اضافه کنید
                        </>
                    )}
                </Button>
            </div>
            {isCreating ? (
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2">
                    <FieldGroup>
                        <Controller name="title" control={form.control} render={({ field, fieldState }) => (
                            <Field>
                                <Input aria-invalid={fieldState.invalid} placeholder="عنوان فصل جدید دوره را وارد کنید..." {...field} className="bg-white" />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )} />
                    </FieldGroup>
                    <Button type="submit" className="w-fit mt-3" disabled={isPending}>
                        {isPending ? (
                            <>
                                <HugeiconsIcon icon={Loader} className="size-4 animate-spin" />
                                <span>Loading...</span>
                            </>
                        ) : (
                            <span>ایجاد</span>
                        )}
                    </Button>
                </form>
            ) : (
                <div className={cn(
                    "text-sm mt-2",
                    !initialData.chapters.length && "text-slate-500 italic"
                )}>
                    {!initialData.chapters.length && ' فصلی وجود ندارد'}
                    <ChaptersList key={JSON.stringify(initialData.chapters.map(i => i.id))} onEdit={onEdit} onReorder={onReorder} items={initialData.chapters || []} />
                </div>
            )}
            {!isCreating && (
                <p className="text-xs text-muted-foreground mt-4">برای مرتب‌سازی مجدد فصل‌ها بکشید و رها کنید</p>
            )}
        </div>
    )
}

export default ChaptersForm
