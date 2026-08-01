"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { createCourseSchema } from "@/schemas/create-course"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import z from "zod"

function CreateCoursePage() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      title: ""
    }
  })

  function onSubmit(values: z.infer<typeof createCourseSchema>) {
    startTransition(async () => {
      try {
        const response = await axios.post('/api/courses', values)
        router.push(`/teacher/courses/${response.data.id}`)
        toast.success("دوره با موفقیت ساخته شد")
      } catch {
        toast.error("خطا در ساخت دوره")
      }
    })
  }

  return (
    <div className="max-w-5xl md:w-fit w-full mx-auto h-full flex flex-col md:items-start md:justify-center gap-4 p-6">
      <h1 className="text-2xl">دوره خود را بسازید</h1>
      <p>دوست داری اسم دوره‌ات رو چی بذاری؟ نگران نباش. بعدا میتوانی آن را تغییر دهید.</p>
      <Card className="w-full">
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-y-6">
              <Controller name="title" control={form.control} render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>عنوان</FieldLabel>
                  <Input aria-invalid={fieldState.invalid} placeholder="عنوان دوره جدید را وارد کنید..." type="text" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )} />

              <div className=" flex items-center gap-x-2">
                <Link href="/" className={buttonVariants({ variant: "secondary" })}>لغو</Link>
                <Button type="submit" className="" disabled={isPending}>
                  {isPending ? (
                    <>
                      <HugeiconsIcon icon={Loader} className="size-4 animate-spin" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <span>ساخت دوره</span>
                  )}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateCoursePage
