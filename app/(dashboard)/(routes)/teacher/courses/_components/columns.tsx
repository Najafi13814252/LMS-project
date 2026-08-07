"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { type DataTableFeatures } from "./data-table-features"
import { Course } from "@/lib/generated/prisma/client"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpDown, Edit, Info } from "@hugeicons/core-free-icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const columnHelper = createColumnHelper<DataTableFeatures, Course>()

export const columns = columnHelper.columns([
    columnHelper.accessor("title", {
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    عنوان
                    <HugeiconsIcon icon={ArrowUpDown} className="mr-2 h-4 w-4" />
                </Button>
            )
        },
    }),
    columnHelper.accessor("price", {
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    قیمت
                    <HugeiconsIcon icon={ArrowUpDown} className="mr-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const price = row.getValue("price") || "قیمتی تایین نشده است"

            return (
                <>
                    <p>{(Number(price)).toLocaleString('fa-ir')} تومان</p>
                </>
            )
        }
    }),
    columnHelper.accessor("isPublished", {
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    وضعیت انتشار
                    <HugeiconsIcon icon={ArrowUpDown} className="mr-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const isPublished = row.getValue("isPublished") || false

            return (
                <Badge className={cn(
                    "bg-slate-500 text-white",
                    isPublished && "bg-lime-700"
                )}>
                    {isPublished ? 'منتشر شده' : 'منتشر نشده'}
                </Badge>
            )
        }
    }),
    columnHelper.display({
        id: "actions",
        cell: ({ row }) => {
            const { id } = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger render={
                        <Button variant="ghost" className="h-4 w-8 p-0">
                            <span className="sr-only">باز کردن منو</span>
                            <HugeiconsIcon icon={Info} />
                        </Button>}>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Link href={`/teacher/courses/${id}`}>
                            <DropdownMenuItem>
                                <HugeiconsIcon icon={Edit} className="w-4 h-4" />
                                ویرایش
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    })
])