import { getProgress } from "@/actions/get-progress"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { ReactNode } from "react"
import CourseSidebar from "./_components/CourseSidebar"
import CourseNavbar from "./_components/CourseNavbar"

async function CourseLayout({ children, params }: { children: ReactNode, params: Promise<{ courseId: string }> }) {
    const { courseId } = await params

    const { userId } = await auth()

    const course = await prisma.course.findUnique({
        where: {
            id: courseId
        },
        include: {
            chapters: {
                where: {
                    isPublished: true
                },
                include: {
                    userProgress: {
                        where: {
                            userId: userId!
                        }
                    }
                },
                orderBy: {
                    position: "asc"
                }
            }
        }
    })

    if (!course) {
        return redirect('/')
    }

    const progressCount = await getProgress(userId!, courseId)

    return (
        <div className="h-full">
            <div className="h-20 w-full md:pr-80 fixed inset-y-0 z-50">
                <CourseNavbar course={course} progressCount={progressCount}/>
            </div>

            <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
                <CourseSidebar course={course} progressCount={progressCount} />
            </div>

            <main className="md:pl-80 pt-20 h-full">
                {children}
            </main>
        </div>
    )
}

export default CourseLayout
