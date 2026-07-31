import { buttonVariants } from "@/components/ui/button"
import { Add } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

function CoursesPage() {
  return (
    <div className="p-6">
      <Link href="/teacher/create" className={buttonVariants()}>
      <HugeiconsIcon icon={Add}/>
        دوره جدید
      </Link>
    </div>
  )
}

export default CoursesPage
