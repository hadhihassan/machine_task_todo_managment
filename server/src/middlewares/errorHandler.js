export const errorHandler = (error, req, res, next) => {
    console.error(error.stack,"catch the error from")
    res.status(500).json({
        errors: [{ message: error.message || "Something went wrong" }],
    });
};