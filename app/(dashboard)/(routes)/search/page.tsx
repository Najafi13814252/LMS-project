import { prisma } from "@/lib/prisma"
import Categories from "./_components/Categories"
import SearchInput from "../../_components/SearchInput"
import { getCourses } from "@/actions/get-courses"
import { auth } from "@clerk/nextjs/server"
import CoursesList from "./_components/CoursesList"
import { Suspense } from "react"

interface SearchPageProps {
  searchParams: Promise<{
    title: string
    categoryId: string
  }>
}

async function SearchPage({ searchParams }: SearchPageProps) {

  const { userId } = await auth()

  const resolvedSearchParams = await searchParams

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "desc"
    }
  })

  const courses = await getCourses({
    userId,
    ...resolvedSearchParams

  })
  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <Suspense fallback={null}>
          <SearchInput />
        </Suspense>
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  )
}

export default SearchPage
