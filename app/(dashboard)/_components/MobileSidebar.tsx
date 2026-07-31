import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Sidebar from './Sidebar'

function MobileSidebar() {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <HugeiconsIcon icon={Menu} />
            </SheetTrigger>
            <SheetContent side='right' className="p-0 bg-white">
                    <Sidebar/>
                </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar
