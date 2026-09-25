import Lead from "../models/Lead";

export const createLead = async (req, res) => {
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
        res.status(500).json({
            message: "Failed to create lead",
            error: err.message,
        });
    }
}

export const getLeads = async (req, res) => {
    try {
        const leads = await Lead.find()
            .populate("customer")
            .sort({ createdAt: -1 });

        res.status(200).json(leads);
    }
    catch (err) {
        res.status(500).json({
            message: "Failed to fetch leads",
            error: err.message,
        });
    }
}

export const getLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id).populate("customer");
        if (!lead) {
            res.status(404).json({
                message: "Lead not found"
            });
        }
        res.status(200).json(lead);
    }
    catch (err) {
        res.status(500).json({
            message: "Failed to fetch lead",
            error: err.message,
        });
    }
}

export const updateLead = async (req, res) => {
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
            res.status(404).json({
                message: "Lead not found"
            });
        }
        res.status(200).json(lead);
    }
    catch (err) {
        res.status(500).json({
            message: "Failed to update lead",
            error: err.message,
        });
    }
}

export const deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findByIdAndDelete(req.params.id);
        if (!lead) {
            res.status(404).json({
                message: "Lead not found"
            });
        }
        res.status(200).json({
            message:"Lead deleted successfully"
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Failed to delete lead",
            error: err.message,
        });
    }
}