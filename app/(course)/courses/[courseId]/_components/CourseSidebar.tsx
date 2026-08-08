import { Chapter, Course, UserProgress } from "@/lib/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import CourseSidebarItem from "./CourseSidebarItem"

export interface CourseProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null
        })[]
    }
    progressCount: number
}

async function CourseSidebar({ course, progressCount }: CourseProps) {
    const { userId } = await auth()

    const purchase = await prisma.purchase.findUnique({
        where: {
            userId_courseId: {
                userId: userId!,
                courseId: course.id
            }
        }
    })
    return (
        <div className="h-full border-l flex flex-col overflow-y-auto shadow-sm">
            <div className="p-7 flex flex-col border-b">
                <h1 className="font-semibold">{course.title}</h1>
            </div>

            <div className="flex flex-col w-full">
                {course.chapters.map(chapter => (
                    <CourseSidebarItem
                        key={chapter.id}
                        id={chapter.id}
                        label={chapter.title}
                        isCompleted={!!chapter.userProgress?.[0]?.isComplated}
                        courseId={course.id}
                        isLocked={!chapter.isFree && !purchase}
                    />
                ))}
            </div>
        </div>
    )
}

export default CourseSidebar
