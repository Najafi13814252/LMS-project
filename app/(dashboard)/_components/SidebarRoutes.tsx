"use client"

import { Chart02FreeIcons, Compass, CourseFreeIcons, Layout } from "@hugeicons/core-free-icons"
import SidebarItems from "./SidebarItems";
import { usePathname } from "next/navigation";

const getsRoutes = [
    {
        icon: Layout,
        label: "داشبورد",
        href: "/"
    },
    {
        icon: Compass,
        label: "جستجو",
        href: "/search"
    },
]

const teacherRoutes = [
    {
        icon: CourseFreeIcons,
        label: "دوره‌ها",
        href: "/teacher/courses"
    },
    {
        icon: Chart02FreeIcons,
        label: "آمارها",
        href: "/teacher/analytics"
    },
]

function SidebarRoutes() {
    const pathname = usePathname()

    const isTeacherPage = pathname?.includes('/teacher')

    const routes = isTeacherPage ? teacherRoutes : getsRoutes;


    return (
        <div className="flex flex-col w-full h-full">
            {routes.map(route => (
                <SidebarItems
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    )
}

export default SidebarRoutes
