"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { Show, SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/nextjs"
import { Logout } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import SearchInput from "./SearchInput"
import { isteacher } from "@/lib/teacher"

function NavbarRotes() {
    const pathname = usePathname()

    const { userId } = useAuth()

    const isTeacherPage = pathname?.startsWith('/teacher')
    const isCoursePage = pathname?.startsWith('/courses')
    const isSearchPage = pathname === "/search"

    return (
        <>
            {isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )}


            <div className="flex items-center gap-x-2 mr-auto">
                {isTeacherPage || isCoursePage ? (
                    <Link href="/" className={buttonVariants({ variant: "ghost" })}>
                        <HugeiconsIcon icon={Logout} className="h-4 w-4" />
                        خروج
                    </Link>

                ) : (
                    <Link href="/teacher/courses">
                        <Button size="sm" variant="ghost">پنل معلم</Button>
                    </Link>
                    //     isteacher(userId!) ? (
                    // <Link href="/teacher/courses">
                    //     <Button size="sm" variant="ghost">پنل معلم</Button>
                    // </Link>
                    // ) : null
                )}

                {/* Auth buttons */}
                <div className="flex items-center gap-4 mr-auto">
                    <Show when="signed-out">
                        <SignInButton>ورود</SignInButton>
                        <SignUpButton>
                            <Button>ثبت‌نام</Button>
                        </SignUpButton>
                    </Show>
                    <Show when="signed-in">
                        <UserButton />
                    </Show>
                </div>
            </div>
        </>
    )
}

export default NavbarRotes
