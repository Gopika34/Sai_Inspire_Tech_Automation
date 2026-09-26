import Customer from "../models/Customer.js";

export const createCustomer = async (req, res, next) => {
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
        next(err);
    }
}

export const getCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.find().sort({ createdAt: -1 });

        res.status(200).json(customers);
    }
    catch (err) {
        next(err);
    }
}

export const getCustomer = async (req, res, next) => {
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
        next(err);
    }
}

export const updateCustomer = async (req, res, next) => {
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
        next(err);
    }
}

export const deleteCustomer = async (req, res, next) => {
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
        next(err);
    }
}
