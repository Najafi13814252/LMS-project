import { cn } from "@/lib/utils"
import { CheckCircle, Warning } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cva, type VariantProps } from "class-variance-authority"

const bannerVariants = cva(
    "border text-center p-3.5 text-sm flex items-center w-full",
    {
        variants: {
            variant: {
                warning: "bg-yellow-200/80 border border-yellow-300 text-slate-800",
                success: "bg-emerald-700 border border-emerald-800 text-slate-800"
            }
        },
        defaultVariants: {
            variant: "warning"
        }
    }
)

interface BannerProps extends VariantProps<typeof bannerVariants> {
    label: string
}

const iconMap = {
    warning: Warning,
    success: CheckCircle
}

function Banner({ label, variant }: BannerProps) {
    const Icon = iconMap[variant || "warning"];
    return (
        <div className={cn(bannerVariants({ variant }))}>
            <HugeiconsIcon icon={Icon} className="w-4 h-4 ml-2"/>
            {label}
        </div>
    )
}

export default Banner
