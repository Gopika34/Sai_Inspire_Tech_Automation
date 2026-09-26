import {z} from "zod";

const customerSchema= z.object({
    name: z
        .string()
        .trim()
        .min((2,"Name must be at least 2 characters")),
    
    phone: z
        .string()
        .trim()
        .min(10,"Phone number must be at least 10 characters"),
    
    location: z
        .string()
        .trim()
        .optional(),
    
    notes: z
        .string()
        .trim()
        .optional(),
});

export default customerSchema;