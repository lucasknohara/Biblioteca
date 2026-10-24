const AppError = require("../errors/AppError.js");

function autorizarPerfil(...perfisPermitidos) {
    return (req, res, next) => {
        let verificaUsuario = perfisPermitidos.includes(req.usuario.perfil);

        if (!verificaUsuario) {
            throw new AppError("Usuário não tem permissão!", 403);
        }

        next()
    };
};

module.exports = {
    autorizarPerfil,
};