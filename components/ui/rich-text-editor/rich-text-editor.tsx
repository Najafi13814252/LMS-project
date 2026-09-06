"use client"

import { Color } from "@tiptap/extension-color"
import { TextStyle } from "@tiptap/extension-text-style"
import { Typography } from "@tiptap/extension-typography"
import { Placeholder } from "@tiptap/extensions"
import { EditorContent, useEditor } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

import { LinkBubble } from "./link-bubble"
import { RichTextEditorToolbar } from "./toolbar"
import "./styles.css"

interface RichTextEditorProps {
    value: string
    onChange: (html: string) => void
    onBlur?: () => void
    placeholder?: string
    className?: string
    editorContentClassName?: string
    editorClassName?: string
    editable?: boolean
    disabled?: boolean
    autofocus?: boolean | "start" | "end"
}

function RichTextEditor({
    value,
    onChange,
    onBlur,
    placeholder = "توضیحات خود را بنویسید...",
    className,
    editorContentClassName,
    editorClassName,
    editable = true,
    disabled = false,
    autofocus = false,
}: RichTextEditorProps) {
    // extensions and editorProps are created once (stable identity) so the
    // editor never gets recreated or churned by option diffing
    const [extensions] = useState(() => [
        StarterKit.configure({
            heading: { levels: [1, 2, 3] },
            link: { openOnClick: false },
            codeBlock: { HTMLAttributes: { dir: "ltr" } },
        }),
        TextStyle,
        Color,
        Typography,
        Placeholder.configure({ placeholder }),
    ])

    const [editorProps] = useState(() => ({
        attributes: {
            class: cn("rte-content", editorClassName),
        },
    }))

    const editor = useEditor(
        {
            immediatelyRender: true,
            extensions,
            content: value,
            editable: editable && !disabled,
            autofocus,
            editorProps,
            onUpdate: ({ editor }) => onChange(editor.getHTML()),
            onBlur: () => onBlur?.(),
        },
        []
    )

    // sync external value changes (e.g. form.reset) into the editor without
    // resetting the caret while the user is typing
    useEffect(() => {
        if (!editor || editor.isDestroyed) return
        if (editor.getHTML() === value) return
        editor.commands.setContent(value || "", { emitUpdate: false })
    }, [editor, value])

    // the `editable` option is only applied on creation — keep it in sync afterwards
    useEffect(() => {
        editor?.setEditable(editable && !disabled)
    }, [editor, editable, disabled])

    return (
        <div
            className={cn(
                "flex flex-col overflow-hidden rounded-md border border-input bg-background shadow-xs",
                "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
                className
            )}
        >
            <RichTextEditorToolbar editor={editor} />
            <EditorContent
                editor={editor}
                className={cn("rte-editor", editorContentClassName)}
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        editor.chain().focus("end").run()
                    }
                }}
            />
            <LinkBubble editor={editor} />
        </div>
    )
}

export { RichTextEditor }
export default RichTextEditor
