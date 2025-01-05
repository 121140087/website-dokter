import { z } from "zod";
export const loginSchema = z.object({
    email: z.string().email(),
    password : z.string().min(6),
});
export const registerSchema = z.object({
    nama : z.string().min(1),
    email: z.string().email(),
    password : z.string().min(6),
});
export const User = z.object({
    id : z.string(),
    email : z.string().email(),
    password : z.string(),
    name : z.string(),
});