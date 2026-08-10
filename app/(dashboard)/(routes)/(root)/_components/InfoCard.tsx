import { cn } from "@/lib/utils"
import { IconSvgObject } from "@hugeicons/core-free-icons/types"
import { HugeiconsIcon } from "@hugeicons/react"

interface InfoCardProps {
    icon: IconSvgObject
    label: string
    numberOfItem: number
    variant?: "default" | "success"
}


function InfoCard({ icon, label, numberOfItem, variant }: InfoCardProps) {
    return (
        <div className="border rounded-md flex items-center gap-x-3 p-3">
            <div className={cn(
                "p-2 rounded-full",
                variant === 'success' ? 'bg-lime-500/10 ' : 'bg-sky-500/10 '
            )}>
                <HugeiconsIcon icon={icon} className={cn(

                    variant === 'success' ? 'text-lime-600 ' : 'text-sky-600'
                )} />
            </div>

            <div>
                <p className="font-medium">{label}</p>
                <p className="text-gray-500 text-sm">{numberOfItem} درس</p>
            </div>
        </div>
    )
}

export default InfoCard
