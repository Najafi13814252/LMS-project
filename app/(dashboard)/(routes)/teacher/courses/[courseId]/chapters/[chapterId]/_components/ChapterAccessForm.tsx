"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldTitle } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Chapter } from "@/lib/generated/prisma/client"
import { cn } from "@/lib/utils"
import { chapterAccessSchema, descriptionCourseSchema } from "@/schemas/create-course"
import { zodResolver } from "@hookform/resolvers/zod"
import { Edit, Loader } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import z from "zod"

interface ChapterAccessFormProps {
    initialData: Chapter
    courseId: string
    chapterId: string
}

function ChapterAccessForm({ initialData, courseId, chapterId }: ChapterAccessFormProps) {
    const [isEditting, setIsEditting] = useState(false)
    const router = useRouter()

    const [isPending, startTransition] = useTransition()
    const form = useForm({
        resolver: zodResolver(chapterAccessSchema),
        defaultValues: {
            isFree: Boolean(initialData.isFree)
        }
    })

    const toggleEdit = () => setIsEditting(current => !current)

    function onSubmit(values: z.infer<typeof chapterAccessSchema>) {
        startTransition(async () => {
            try {
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
                toast.success("دوره با موفقیت بروز شد")
                toggleEdit()
                router.refresh()
            } catch {
                toast.error("خطایی رخ داده است")
            }
        })
    }
    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                دسترسی فصل
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditting ? (
                        <>لغو</>
                    ) : (
                        <>
                            <HugeiconsIcon icon={Edit} className="h-4 w-4" />
                            ویرایش دسترسی
                        </>
                    )}
                </Button>
            </div>
            {!isEditting ? (
                <p className={cn("text-sm mt-2",
                    !initialData.isFree && "text-slate-500 italic")}>
                    {initialData.isFree ? (
                        <>این فصل برای پیش‌نمایش رایگان است</>
                    ) : (
                        <>این فصل رایگان نیست</>
                    )}
                </p>
            ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2">
                    <FieldGroup>
                        <Controller name="isFree" control={form.control} render={({ field, fieldState }) => (
                            <FieldLabel>
                                <Field orientation="horizontal">
                                    <Checkbox id="chapter-checkbox" aria-invalid={fieldState.invalid} checked={field.value} onCheckedChange={field.onChange} className="bg-white cursor-pointer" />
                                    <FieldContent>
                                        <FieldTitle>رایگان کردن فصل</FieldTitle>
                                        <FieldDescription>اگر میخواهید این فصل رایگان باشد گزینه رایگان را انتخاب کنید</FieldDescription>
                                    </FieldContent>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            </FieldLabel>
                        )} />
                    </FieldGroup>
                    <Button type="submit" className="w-fit mt-3" disabled={isPending}>
                        {isPending ? (
                            <>
                                <HugeiconsIcon icon={Loader} className="size-4 animate-spin" />
                                <span>Loading...</span>
                            </>
                        ) : (
                            <span>ذخیره</span>
                        )}
                    </Button>
                </form>
            )}
        </div>
    )
}

export default ChapterAccessForm
