import NavbarRotes from "@/app/(dashboard)/_components/NavbarRotes"
import { CourseProps } from "./CourseSidebar"
import CourseMobileSidebar from "./CourseMobileSidebar"

function CourseNavbar({ course, progressCount }: CourseProps) {
  return (
    <div className="p-4 border-b w-full h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRotes />
    </div>
  )
}

export default CourseNavbar
