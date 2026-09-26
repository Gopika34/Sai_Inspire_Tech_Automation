import express from "express";
import {
    createLead,
    getLeads,
    getLead,
    updateLead,
    deleteLead,
} from "../controllers/leadController.js";
import validate from "../middleware/validate.js";
import {leadSchema} from "../middleware/validate.js";

const router= express.Router();

router.get("/",validate(leadSchema),getLeads);
router.post("/",createLead);
router.get("/:id",getLead);
router.patch("/:id",validate(leadSchema.partial()),updateLead);
router.delete("/:id",deleteLead);

export default router;