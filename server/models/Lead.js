import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            "CCTV",
            "NETWORKING",
            "DIGITAL_LOCK",
            "BIOMETRIC",
            "ACCESS_CONTROL",
            "SERVICE_REPAIR",
            "OTHER",
        ]
    },
    requirement: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: [
            "NEW",
            "CONTACTED",
            "SITE_VISIT",
            "QUOTATION",
            "WON",
            "LOST",
        ],
        default : "NEW"
    },
    followUpDate: {
        type: Date,
    },
    notes: {
        type: String,
        trim: true
    },
},{
    timestamps:true
})

export default mongoose.model("Lead",leadSchema);