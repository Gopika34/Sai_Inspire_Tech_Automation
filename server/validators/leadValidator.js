import { z } from "zod";

const leadSchema = z.object({
    customer: z
        .string()
        .min(1, "Customer ID is required"),

    category: z.enum([
        "CCTV",
        "NETWORKING",
        "DIGITAL_LOCK",
        "BIOMETRIC",
        "ACCESS_CONTROL",
        "SERVICE_REPAIR",
        "OTHER",
    ]),

    requirements: z
        .string()
        .trim()
        .min(3, "Requirement must be at least 3 characters"),
    
    location: z
        .string()
        .trim()
        .optional(),
    
    notes: z
        .string()
        .trim()
        .optional(),
});

export default leadSchema;