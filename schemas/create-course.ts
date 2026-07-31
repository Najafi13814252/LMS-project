import z from "zod";

export const createCourseSchema = z.object({
title: z.string().min(1, "عنوان الزامی میباشد") 

}) 