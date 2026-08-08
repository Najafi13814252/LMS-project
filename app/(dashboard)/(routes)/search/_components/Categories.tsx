import { Category } from "@/lib/generated/prisma/client"
import { Calculator, Camera, Computer, Film, Fitness, Music } from "@hugeicons/core-free-icons"
import { IconSvgObject } from "@hugeicons/core-free-icons/types"
import CategoryItem from "./CategoryItem"

const iconMap: Record<Category["name"], IconSvgObject> = {
    "موسیقی": Music,
    "عکاسی": Camera,
    "ورزش و تناسب‌اندام": Fitness,
    "حسابداری": Calculator,
    "علوم کامپیوتر": Computer,
    "فیلمبرداری": Film
}

function Categories({ items }: { items: Category[] }) {
    return (
        <div className="flex items-center gap-x-2 pb-2 overflow-x-auto">
            {items.map(item => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                />
            ))}
        </div>
    )
}

export default Categories
