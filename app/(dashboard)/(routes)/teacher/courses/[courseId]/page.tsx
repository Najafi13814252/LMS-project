import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { LayoutDashboard } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { redirect } from "next/navigation"
import toast from "react-hot-toast"
import TitleForm from "./_components/TitleForm"
import DescriptionForm from "./_components/DescriptionForm"
import ImageForm from "./_components/ImageForm"
import CategoryForm from "./_components/CategoryForm"

async function Course({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params

  const { userId } = await auth()

  if (!userId) {
    toast("وارد حساب کاربری خود شوید", {
      style: {
        background: "#fefce8",
        border: "1px solid oklch(68.1% 0.162 75.834)",
        color: "oklch(68.1% 0.162 75.834)"
      }
    })
    return redirect("/")
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId }
  })

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc"
    }
  })

  if (!course) {
    return redirect("/")
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId
  ]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `(${completedFields} / ${totalFields})`


  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">تنظیمات دوره</h1>
          <span className="text-sm text-slate-800 ">{completionText} فیلد تکمیل شده</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <div className="bg-lime-500/10 p-2 rounded-full">
              <HugeiconsIcon icon={LayoutDashboard} className="text-lime-600" />
            </div>
            <h2 className="text-xl">دوره خود را شخصی‌سازی کنید</h2>
          </div>
          <TitleForm initialData={course} courseId={course.id}/>
          <DescriptionForm initialData={course} courseId={course.id}/>
          <ImageForm initialData={course} courseId={course.id}/>
          <CategoryForm initialData={course} courseId={course.id} options={categories.map(category => ({
            label: category.name,
            value: category.id
          }))}/>
        </div>
      </div>
    </div>
  )
}

export default Course
