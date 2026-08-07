import { buttonVariants } from "@/components/ui/button"
import { Add } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

import { auth } from "@clerk/nextjs/server"
import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

async function CoursesPage() {
const {userId} = await auth()

if (!userId) {
  return redirect('/')
}

  const courses = await prisma.course.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: "desc"
    }
  })
  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses}/>
    </div>
  )
}

export default CoursesPage
