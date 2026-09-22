function errorHandler(error, req, res, next) {
    console.log(error.message);

    res.status(error.status ?? 500).json({
        error: error.message
    });
};

module.exports = errorHandler;