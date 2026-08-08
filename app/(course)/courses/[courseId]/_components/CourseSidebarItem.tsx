"use client"

import { cn } from "@/lib/utils"
import { CheckCircle, PlayCircleIcon, SquareLock02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { usePathname, useRouter } from "next/navigation"

interface CourseSidebarItemProps {
    id: string
    label: string
    isCompleted: boolean
    courseId: string
    isLocked: boolean
}

function CourseSidebarItem({ id, label, isCompleted, courseId, isLocked }: CourseSidebarItemProps) {
    const pathname = usePathname()
    const router = useRouter()

    const icon = isLocked ? SquareLock02Icon : (isCompleted ? CheckCircle : PlayCircleIcon)

    const isActive = pathname.includes(id)

    const onClick = () => {
        router.push(`/courses/${courseId}/chapters/${id}`)
    }
    return (
        <button onClick={onClick} className={cn(
            "flex items-center gap-x-2 text-slate-500 text-sm font-medium pr-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
            isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
            isCompleted && "text-emerald-700 hover:text-emerald-700",
            isCompleted && isActive && "bg-emerald-200/20"
        )}>
            <div className="flex items-center gap-x-2 py-4">
                <HugeiconsIcon icon={icon} size={22} className={cn(
                    "text-slate-500",
                    isActive && "text-slate-700",
                    isCompleted && "text-emerald-700"
                )}/>
                {label}
            </div>

            <div className={cn(
                "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
                isActive && "opacity-100",
                isCompleted && "border-emerald-700"
            )}></div>
        </button>
    )
}

export default CourseSidebarItem
