import express from "express";
import {
    createLead,
    getLeads,
    getLead,
    updateLead,
    deleteLead,
} from "../controllers/leadController";

const router= express.Router();

router.get("/",getLeads);
router.post("/",createLead);
router.get("/:id",getLead);
router.patch("/:id",updateLead);
router.delete("/:id",deleteLead);

export default router;