"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { Logout } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

function NavbarRotes() {
    const pathname = usePathname()

    const isTeacherPage = pathname?.startsWith('/teacher')
    const isPlayerPage = pathname?.startsWith('/chapter')
    return (
        <div className="flex items-center gap-x-2 mr-auto">
            {isTeacherPage || isPlayerPage ? (
                <Link href="/" className={buttonVariants({ variant: "ghost" })}>
                    <HugeiconsIcon icon={Logout} className="h-4 w-4" />
                    خروج
                </Link>

            ) : (
                <Link href="/teacher/courses">
                    <Button size="sm" variant="ghost">Teacher mode</Button>
                </Link>
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
    )
}

export default NavbarRotes
