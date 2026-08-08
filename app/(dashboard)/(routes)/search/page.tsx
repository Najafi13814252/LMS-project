import { prisma } from "@/lib/prisma"
import Categories from "./_components/Categories"
import SearchInput from "../../_components/SearchInput"

async function SearchPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "desc"
    }
  })
  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories items={categories} />
      </div>
    </>
  )
}

export default SearchPage
