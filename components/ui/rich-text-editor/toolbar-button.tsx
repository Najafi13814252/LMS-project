"use client"

import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"

import { Toggle } from "@/components/ui/toggle"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface ToolbarToggleProps {
    icon: IconSvgElement
    label: string
    pressed?: boolean
    disabled?: boolean
    onClick?: () => void
}

function ToolbarToggle({ icon, label, pressed = false, disabled, onClick }: ToolbarToggleProps) {
    return (
        <Tooltip>
            <TooltipTrigger
                render={
                    <Toggle
                        size="sm"
                        aria-label={label}
                        pressed={pressed}
                        disabled={disabled}
                        onPressedChange={() => onClick?.()}
                    >
                        <HugeiconsIcon icon={icon} />
                    </Toggle>
                }
            />
            <TooltipContent>{label}</TooltipContent>
        </Tooltip>
    )
}

export { ToolbarToggle }
