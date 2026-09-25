const AppError = require("../errors/AppError");

function validarId(req, res, next) {
    const id = Number(req.params.id);

    if (id <= 0 || !Number.isInteger(id)) {
        throw new AppError("Id inválido!", 400);
    }

    next();
}

module.exports = validarId;