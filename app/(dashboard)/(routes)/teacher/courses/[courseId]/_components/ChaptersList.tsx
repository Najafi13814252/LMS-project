"use client"

import { Chapter } from "@/lib/generated/prisma/client"
import { useState } from "react"

import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { Edit, Grip } from "@hugeicons/core-free-icons"
import { Badge } from "@/components/ui/badge"

interface ChaptersListProp {
    onEdit: (id: string) => void
    onReorder: (updateDate: { id: string, position: number }[]) => void
    items: Chapter[]
}

function ChaptersList({ onEdit, onReorder, items }: ChaptersListProp) {
    const [chapters, setChapters] = useState(items)

    function onDragEnd(result: DropResult) {
        // لغو drag اگر آیتم جایی به غیر از ناحیه droppable رها کند
        if (!result.destination) return

        // جابجایی ایتم در آرایه 
        //1. ساخت کپی جدید از آرایه 
        const newItems = Array.from(chapters)
        // 2. آیتمی که کشیده شده را از جایش حذف میکنیم و در متغیر reordered میگذاریم 
        const [reordered] = newItems.splice(result.source.index, 1)
        //3. همان آیتم را در موقعیت جدید در آرایه میگذاریم 
        newItems.splice(result.destination.index, 0, reordered)

        setChapters(newItems)

        // محاسبه تغییرات دیتابیس 
        const startIndex = Math.min(result.source.index, result.destination.index)
        const endIndex = Math.max(result.source.index, result.destination.index)
        const updatedChapters = newItems.slice(startIndex, endIndex + 1)

        // مرتب‌سازی آرایه بر اساس بازه تغییر
        const bulkUpdateData = updatedChapters.map(chapter => ({
            id: chapter.id,
            position: newItems.findIndex(item => item.id === chapter.id)
        }))

        onReorder(bulkUpdateData)
    }

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="chapters">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {chapters.map((chapter, index) => (
                                <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                                    {(provided) => (
                                        <div
                                            className={cn(
                                                "flex items-center gap-x-2 bg-slate-200 border border-slate-200 text-slate-700 rounded-l-md mb-4 text-sm",
                                                chapter.isPublished && "bg-lime-50 border border-lime-200 text-lime-700"
                                            )}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                        >
                                            {/* آیکن grip */}
                                            <div
                                                className={cn(
                                                    "px-2 py-3 border-r border-r-slate-500 hover:bg-slate-300 rounded-l-md transition",
                                                    chapter.isPublished && "border-r border-r-lime-200 hover:bg-lime-200"
                                                )}
                                                {...provided.dragHandleProps}
                                            >
                                                <HugeiconsIcon icon={Grip} className="w-5 h-5" />
                                            </div>
                                            {/* عنوان فصل */}
                                            {chapter.title}

                                            {/* وضعیت انتشار دوره */}
                                            <div className="mr-auto px-2 flex items-center gap-x-2">
                                                {chapter.isFree && (
                                                    <Badge>رایگان</Badge>
                                                )}
                                                <Badge className={cn(
                                                    "bg-slate-500 text-white",
                                                    chapter.isPublished && 'bg-lime-700'
                                                )}>
                                                    {chapter.isPublished ? 'منتشر شده' : 'منتشر نشده'}
                                                </Badge>
                                                {/* ویرایش دوره */}
                                                <HugeiconsIcon icon={Edit} onClick={() => onEdit(chapter.id)} className="w-4 h-4 hover:opacity-75 transition cursor-pointer" />
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default ChaptersList