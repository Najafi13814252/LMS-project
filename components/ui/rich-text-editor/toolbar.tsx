"use client"

import {
    BoldIcon,
    CodeIcon,
    Heading01Icon,
    Heading02Icon,
    Heading03Icon,
    LeftToRightListBulletIcon,
    LeftToRightListNumberIcon,
    Link01Icon,
    MinusSignIcon,
    QuoteDownIcon,
    Redo02Icon,
    SourceCodeIcon,
    TextClearIcon,
    TextColorIcon,
    TextItalicIcon,
    TextStrikethroughIcon,
    TextUnderlineIcon,
    Undo02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useEditorState } from "@tiptap/react"
import type { Editor } from "@tiptap/react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

import { LinkForm } from "./link-bubble"
import { ToolbarToggle } from "./toolbar-button"

const TEXT_COLORS = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#10b981",
    "#06b6d4",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#64748b",
]

function RichTextEditorToolbar({ editor }: { editor: Editor }) {
    // re-render the toolbar on every transaction so active/disabled states stay fresh
    useEditorState({
        editor,
        selector: ({ transactionNumber }) => transactionNumber,
    })

    const [linkOpen, setLinkOpen] = useState(false)

    return (
        <TooltipProvider>
            <div className="flex flex-wrap items-center gap-0.5 border-b border-input p-1.5">
                <ToolbarToggle
                    icon={Heading01Icon}
                    label="تیتر ۱"
                    pressed={editor.isActive("heading", { level: 1 })}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                />
                <ToolbarToggle
                    icon={Heading02Icon}
                    label="تیتر ۲"
                    pressed={editor.isActive("heading", { level: 2 })}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                />
                <ToolbarToggle
                    icon={Heading03Icon}
                    label="تیتر ۳"
                    pressed={editor.isActive("heading", { level: 3 })}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                />

                <Separator orientation="vertical" className="mx-1" />

                <ToolbarToggle
                    icon={BoldIcon}
                    label="بولد"
                    pressed={editor.isActive("bold")}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                />
                <ToolbarToggle
                    icon={TextItalicIcon}
                    label="ایتالیک"
                    pressed={editor.isActive("italic")}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                />
                <ToolbarToggle
                    icon={TextUnderlineIcon}
                    label="زیرخط"
                    pressed={editor.isActive("underline")}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                />
                <ToolbarToggle
                    icon={TextStrikethroughIcon}
                    label="خط‌خورده"
                    pressed={editor.isActive("strike")}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                />
                <ToolbarToggle
                    icon={CodeIcon}
                    label="کد"
                    pressed={editor.isActive("code")}
                    onClick={() => editor.chain().focus().toggleCode().run()}
                />
                <ToolbarToggle
                    icon={TextClearIcon}
                    label="پاک کردن فرمت"
                    disabled={!editor.can().unsetAllMarks()}
                    onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                />

                <Separator orientation="vertical" className="mx-1" />

                <ToolbarToggle
                    icon={LeftToRightListBulletIcon}
                    label="لیست نقطه‌ای"
                    pressed={editor.isActive("bulletList")}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                />
                <ToolbarToggle
                    icon={LeftToRightListNumberIcon}
                    label="لیست شماره‌دار"
                    pressed={editor.isActive("orderedList")}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                />
                <ToolbarToggle
                    icon={QuoteDownIcon}
                    label="نقل‌قول"
                    pressed={editor.isActive("blockquote")}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                />
                <ToolbarToggle
                    icon={SourceCodeIcon}
                    label="بلاک کد"
                    pressed={editor.isActive("codeBlock")}
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                />
                <ToolbarToggle
                    icon={MinusSignIcon}
                    label="خط افقی"
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                />

                <Separator orientation="vertical" className="mx-1" />

                <Popover>
                    <PopoverTrigger
                        render={
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                aria-label="رنگ متن"
                                className={cn(
                                    editor.isActive("textStyle") && "bg-muted text-foreground"
                                )}
                            >
                                <HugeiconsIcon icon={TextColorIcon} />
                            </Button>
                        }
                    />
                    <PopoverContent className="w-auto p-2">
                        <div className="grid grid-cols-5 gap-1.5">
                            {TEXT_COLORS.map((color) => (
                                <Button
                                    key={color}
                                    type="button"
                                    size="icon-sm"
                                    variant="ghost"
                                    aria-label={`رنگ ${color}`}
                                    className={cn(
                                        "rounded-full",
                                        editor.isActive("textStyle", { color }) &&
                                            "ring-2 ring-ring ring-offset-2 ring-offset-background"
                                    )}
                                    style={{ backgroundColor: color }}
                                    onClick={() => editor.chain().focus().setColor(color).run()}
                                />
                            ))}
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="mt-2 w-full"
                            onClick={() => editor.chain().focus().unsetColor().run()}
                        >
                            حذف رنگ
                        </Button>
                    </PopoverContent>
                </Popover>

                <Popover open={linkOpen} onOpenChange={setLinkOpen}>
                    <PopoverTrigger
                        render={
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                aria-label="افزودن لینک"
                                className={cn(
                                    editor.isActive("link") && "bg-muted text-foreground"
                                )}
                            >
                                <HugeiconsIcon icon={Link01Icon} />
                            </Button>
                        }
                    />
                    <PopoverContent className="w-auto p-2">
                        <LinkForm editor={editor} onDone={() => setLinkOpen(false)} />
                    </PopoverContent>
                </Popover>

                <Separator orientation="vertical" className="mx-1" />

                <ToolbarToggle
                    icon={Undo02Icon}
                    label="بازگردانی"
                    disabled={!editor.can().undo()}
                    onClick={() => editor.chain().focus().undo().run()}
                />
                <ToolbarToggle
                    icon={Redo02Icon}
                    label="انجام مجدد"
                    disabled={!editor.can().redo()}
                    onClick={() => editor.chain().focus().redo().run()}
                />
            </div>
        </TooltipProvider>
    )
}

export { RichTextEditorToolbar }
