import z from "zod";

export const createCourseSchema = z.object({
title: z.string().min(1, "عنوان الزامی میباشد") 
}) 

export const descriptionCourseSchema = z.object({
    description: z.string().min(1, "توضیحات الزامی میباشد") 
})

export const imageCourseSchema = z.object({
    imageUrl: z.string().min(1, "عکس الزامی میباشد") 
})

export const categoryCourseSchema = z.object({
    categoryId: z.string().min(1) 
})

export const priceCourseSchema = z.object({
    price: z.union([z.string(), z.number()]).pipe(z.coerce.number())
})

export const attachmentCourseSchema = z.object({
    url: z.string().min(1)
})

export const chapterCourseSchema = z.object({
    title: z.string().min(1)
})

export const chapterAccessSchema = z.object({
    isFree: z.boolean().default(false)
})

export const chapterVideoSchema = z.object({
    videoUrl: z.string().min(1, "ویدئو الزامی میباشد") 
})