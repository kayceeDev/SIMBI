"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.error('Error Stack:', err.stack);
    console.error('Error Details:', {
        message: err.message,
        name: err.name,
        path: req.path,
        method: req.method,
        body: req.body
    });
    // Send more detailed error response
    res.status(500).json({
        error: 'Server error',
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};
exports.default = errorHandler;
