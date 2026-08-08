"use client"

import { cn } from "@/lib/utils"
import { IconSvgObject } from "@hugeicons/core-free-icons/types"
import { HugeiconsIcon } from "@hugeicons/react"
import { usePathname, useSearchParams } from "next/navigation"
import Form from 'next/form'


interface CategoryItemProps {
    label: string
    icon?: IconSvgObject
    value?: string
}

function CategoryItem({ label, icon, value }: CategoryItemProps) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const currentCategoryId = searchParams.get("categoryId")
    const currentTitle = searchParams.get("title")

    const isSelected = currentCategoryId === value

    return (
        <Form action={pathname}>
            {currentTitle && (
                <input type="hidden" name="title" value={currentTitle} />
            )}
            {!isSelected && value && (
                <input type="hidden" name="categoryId" value={value} />
            )}
            <button type="submit" className={cn(
                "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1.5 hover:border-lime-500 transition",
                isSelected && 'border border-lime-600 bg-lime-200/10 text-lime-800'
            )}>
                {icon && <HugeiconsIcon icon={icon} size={20} className="text-lime-500" />}
                <div className="truncate">
                    {label}
                </div>
            </button>
        </Form>
    )
}

export default CategoryItem
