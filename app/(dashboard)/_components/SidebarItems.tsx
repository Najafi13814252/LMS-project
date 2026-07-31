"use client"

import { cn } from "@/lib/utils"
import { IconSvgObject } from "@hugeicons/core-free-icons/types"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarItemsProps {
    icon: IconSvgObject
    label: string
    href: string
}

function SidebarItems({ icon, label, href }: SidebarItemsProps) {
    const pathname = usePathname()

    const isActive =
        (pathname === '/' && href === '/') ||
        pathname === href ||
        pathname?.startsWith(`${href}/`)


    return (
        <Link href={href} className={cn(
            "flex items-center gap-x-2 pr-2 text-slate-500 text-sm font-medium transition-all hover:text-slate-600 hover:bg-slate-300/20",
            isActive && "text-lime-700 bg-lime-200/20 hover:bg-lime-200/20 hover:text-lime-700"
        )}>

            <div className="flex items-center gap-x-2 py-4">
                <HugeiconsIcon icon={icon} size={22} className={cn(
                    "text-slate-500",
                    isActive && "text-lime-700"
                )} />
                {label}
            </div>
            <div className={cn(
                "mr-auto opacity-0 border-2 border-lime-700 h-full transition-all",
                isActive && "opacity-100 rounded-r"
            )}
            />

        </Link>
    )
}

export default SidebarItems
