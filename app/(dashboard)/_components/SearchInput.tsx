"use client"

import { Input } from "@/components/ui/input"
import useDebounce from "@/hooks/useDebounce"
import { Search } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Form from "next/form"

function SearchInput() {
    const searchParams = useSearchParams()

    const currentTitle = searchParams.get("title") ?? ""
    const currentCategoryId = searchParams.get("categoryId")

    const [value, setValue] = useState(currentTitle)
    const pathname = usePathname()
    const formRef = useRef<HTMLFormElement>(null)

    const debounceValue = useDebounce(value)

    useEffect(() => {
        formRef.current?.requestSubmit()
    }, [debounceValue])

    return (
        <Form ref={formRef} className="relative" action={pathname}>
            {currentCategoryId && (
                <input type="hidden" name="categoryId" value={currentCategoryId} />
            )}
            <HugeiconsIcon icon={Search} className="w-4 h-4 absolute top-2.5 right-3 text-slate-600" />
            <Input
                name="title"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full md:w-80 pr-8 bg-slate-100 rounded-full focus-visible:ring-slate-200"
                placeholder="جستجوی دوره..."
            />
        </Form>
    )
}

export default SearchInput