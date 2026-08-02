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
    price: z.coerce.number()
})

export const attachmentCourseSchema = z.object({
    url: z.string().min(1)
})