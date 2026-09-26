import Lead from "../models/Lead.js";

export const createLead = async (req, res, next) => {
    try {
        const {
            customer,
            category,
            requirement,
            location,
            followUpDate,
            notes,
        } = req.body;

        const lead = await Lead.create({
            customer,
            category,
            requirement,
            location,
            followUpDate,
            notes,
        });

        const populatedLead = await lead.populate("customer");
        res.status(201).json(populatedLead);
    }
    catch (err) {
        next(err);
    }
}

export const getLeads = async (req, res, next) => {
    try {
        const leads = await Lead.find()
            .populate("customer")
            .sort({ createdAt: -1 });

        res.status(200).json(leads);
    }
    catch (err) {
        next(err);
    }
}

export const getLead = async (req, res, next) => {
    try {
        const lead = await Lead.findById(req.params.id).populate("customer");
        if (!lead) {
            return res.status(404).json({
                message: "Lead not found"
            });
        }
        res.status(200).json(lead);
    }
    catch (err) {
        next(err);
    }
}

export const updateLead = async (req, res, next) => {
    try {
        const lead = await Lead.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        ).populate("customer");
        if (!lead) {
            return res.status(404).json({
                message: "Lead not found"
            });
        }
        res.status(200).json(lead);
    }
    catch (err) {
        next(err);
    }
}

export const deleteLead = async (req, res, next) => {
    try {
        const lead = await Lead.findByIdAndDelete(req.params.id);
        if (!lead) {
            return res.status(404).json({
                message: "Lead not found"
            });
        }
        res.status(200).json({
            message:"Lead deleted successfully"
        });
    }
    catch (err) {
        next(err);
    }
}