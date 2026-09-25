import Customer from "../models/Customer.js";

export const createCustomer = async (req, res) => {
    try {
        const { name, phone, location, notes } = req.body;

        const customer = await Customer.create({
            name,
            phone,
            location,
            notes,
        });

        res.status(201).json(customer);
    }
    catch (err) {
        res.status(500).json({
            message: "Failed to create customer",
            error: err.message,
        });
    }
}

export const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().sort({ createdAt: -1 });

        res.status(200).json(customers);
    }
    catch (err) {
        res.status(500).json({
            message: "Failed to fetch customers",
            error: err.message,
        });
    }
}

export const getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({
                message: "Customer not found!",
            });
        }

        res.status(200).json(customer);
    }
    catch (err) {
        res.status(500).json({
            message: "Failed to fetch customer",
            error: err.message,
        });
    }
}

export const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found!",
            });
        }

        res.status(200).json(customer);
    }
    catch (err) {
        res.status(500).json({
            message: "Failed to update customer",
            error: err.message,
        });
    }
}

export const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            return res.status(404).json({
                message: "Customer not found!",
            });
        }
        res.status(200).json({
            message: "Customer deleted successfully",
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Failed to create customer",
            error: err.message,
        });
    }
}
