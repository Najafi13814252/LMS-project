"use client"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { createCourseSchema } from "@/schemas/create-course"
import { zodResolver } from "@hookform/resolvers/zod"
import { Edit, Loader } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import z from "zod"

interface TitleFormProps {
  initialData: {
    title: string
  }
  courseId: string
  chapterId: string
}

function ChapterTitleForm({ initialData, courseId, chapterId }: TitleFormProps) {
  const [isEditting, setIsEditting] = useState(false)
  const router = useRouter()

  const [isPending, startTransition] = useTransition()
  const form = useForm({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      title: initialData.title
    }
  })

  const toggleEdit = () => setIsEditting(current => !current)

  function onSubmit(values: z.infer<typeof createCourseSchema>) {
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
        عنوان فصل
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditting ? (
            <>لغو</>
          ) : (
            <>
              <HugeiconsIcon icon={Edit} className="h-4 w-4" />
              ویرایش عنوان
            </>
          )}
        </Button>
      </div>
      {!isEditting ? (
        <p className="text-sm mt-2">{initialData.title}</p>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2">
          <FieldGroup>
            <Controller name="title" control={form.control} render={({ field, fieldState }) => (
              <Field>
                <Input aria-invalid={fieldState.invalid} placeholder="عنوان جدید دوره را وارد کنید..." type="text" {...field} className="bg-white" />
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
                <span>ذخیره</span>
              )}
            </Button>
        </form>
      )}
    </div>
  )
}

export default ChapterTitleForm
