"use client"

import { Unlink01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { BubbleMenu } from "@tiptap/react/menus"
import type { Editor } from "@tiptap/react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface LinkFormProps {
    editor: Editor
    onDone?: () => void
    className?: string
}

function LinkForm({ editor, onDone, className }: LinkFormProps) {
    const [href, setHref] = useState(() =>
        editor.isActive("link") ? (editor.getAttributes("link").href as string) : ""
    )

    const apply = () => {
        const url = href.trim()
        if (url) {
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
        } else {
            editor.chain().focus().extendMarkRange("link").unsetLink().run()
        }
        onDone?.()
    }

    return (
        <div className={cn("flex items-center gap-1.5", className)}>
            <Input
                value={href}
                onChange={(e) => setHref(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault()
                        apply()
                    }
                }}
                placeholder="https://example.com"
                className="h-8 w-44"
                dir="ltr"
            />
            <Button type="button" size="sm" onClick={apply}>
                اعمال
            </Button>
            <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                aria-label="حذف لینک"
                onClick={() => {
                    editor.chain().focus().extendMarkRange("link").unsetLink().run()
                    onDone?.()
                }}
            >
                <HugeiconsIcon icon={Unlink01Icon} />
            </Button>
        </div>
    )
}

function LinkBubble({ editor }: { editor: Editor }) {
    return (
        <BubbleMenu
            editor={editor}
            shouldShow={({ editor }) => editor.isActive("link")}
            className="flex items-center gap-1 rounded-md border border-border bg-popover p-2 shadow-md"
        >
            <LinkForm editor={editor} />
        </BubbleMenu>
    )
}

export { LinkBubble, LinkForm }
