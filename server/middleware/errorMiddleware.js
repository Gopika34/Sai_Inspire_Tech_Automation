const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.name === "CastError") {
        return res.status(400).json({
            message: "Invalid ID format",
        })
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: "Database validation failed",
            errors: Object.values(err.errors).map((error) => error.message),
        })
    }

    if (err.code === 11000) {
        return res.status(409).json({
            message: "Duplicate record",
        });
    }


    res.status(500).json({
        message: "Internal server error",
    });
};

export default errorHandler;