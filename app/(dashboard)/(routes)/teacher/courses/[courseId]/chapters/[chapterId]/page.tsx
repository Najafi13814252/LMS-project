import { buttonVariants } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { ArrowRight, Eye, LayoutDashboard, Video } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { redirect } from "next/navigation"
import ChapterTitleForm from "./_components/ChapterTitleForm"
import ChapterDescriptionForm from "./_components/ChapterDescriptionForm"
import ChapterAccessForm from "./_components/ChapterAccessForm"
import ChapterVideoForm from "./_components/ChapterVideoFrom"

async function Chapter({ params }: { params: Promise<{ courseId: string, chapterId: string }> }) {
    const { chapterId, courseId } = await params

    const { userId } = await auth()

    if (!userId) {
        return redirect("/")
    }

    const chapter = await prisma.chapter.findUnique({
        where: { id: chapterId, courseId },
        include: {
            muxData: true
        }
    })

    if (!chapter) {
        return redirect('/')
    }

    const requiredFields = [
        chapter.title,
        chapter.description,
        chapter.videoUrl
    ]

    const totalFields = requiredFields.length
    const completedFields = requiredFields.filter(Boolean).length

    const completionText = `(${completedFields} / ${totalFields})`

    return (
        <div className="p-6">
            <div className="w-full">
                <Link href={`/teacher/courses/${courseId}`} className={buttonVariants({ variant: "secondary" })}>
                    <HugeiconsIcon icon={ArrowRight} className="w-4 h-4" />
                    بازگشت به تنظیمات دوره
                </Link>
                <div className="flex items-center justify-between w-full mt-6">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-medium">تنظیمات فصل دوره</h1>
                        <span className="text-sm text-slate-800 ">{completionText} فیلد تکمیل شده</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div className="space-y-6">
                    <div className="flex items-center gap-x-2">
                        <div className="bg-lime-500/10 p-2 rounded-full">
                            <HugeiconsIcon icon={LayoutDashboard} className="text-lime-600" />
                        </div>
                        <h2 className="text-xl">فصل خود را شخصی‌سازی کنید</h2>
                    </div>

                    <ChapterTitleForm initialData={chapter} chapterId={chapterId} courseId={courseId} />
                    <ChapterDescriptionForm initialData={chapter} courseId={courseId} chapterId={chapterId} />
                    <div>
                        <div className="flex items-center gap-x-2">
                            <div className="bg-lime-500/10 p-2 rounded-full">
                                <HugeiconsIcon icon={Eye} className="text-lime-600" />
                            </div>
                            <h2 className="text-xl">تنظیمات دسترسی</h2>
                        </div>
                        <ChapterAccessForm initialData={chapter} courseId={courseId} chapterId={chapterId} />
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-x-2">
                        <div className="bg-lime-500/10 p-2 rounded-full">
                            <HugeiconsIcon icon={Video} className="text-lime-600" />
                        </div>
                        <h2 className="text-xl">افزودن ویدئو</h2>
                    </div>
                    <ChapterVideoForm initialData={chapter} courseId={courseId} chapterId={chapterId} />
                </div>
            </div>
        </div>
    )
}

export default Chapter
