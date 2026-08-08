import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import CourseSidebar, { CourseProps } from './CourseSidebar'
import { HugeiconsIcon } from '@hugeicons/react'
import { Menu } from '@hugeicons/core-free-icons'
function CourseMobileSidebar({ course, progressCount }: CourseProps) {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <HugeiconsIcon icon={Menu} />
            </SheetTrigger>
            <SheetContent side='right' className="p-0 bg-white">
                <CourseSidebar course={course} progressCount={progressCount}/>
            </SheetContent>
        </Sheet>
    )
}

export default CourseMobileSidebar
