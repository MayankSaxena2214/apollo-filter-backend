export class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = function (err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    console.log("Some error occurred", err);
    return res.status(err.statusCode).json({
        success: false, // should be false when sending error
        message: err.message
    });
};
