const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError.js");

function autenticarUsuario(req, res, next) {
    const autorizacao = req.headers.authorization;

    if (!autorizacao) {
        return next(
            new AppError("Token não informado!", 401)
        );
    }

    const [tipo, token] = autorizacao.split(" ");

    if (tipo !== "Bearer" || !token) {
        return next(
            new AppError("Formato de token inválido!", 401)
        );
    }

    try {
        const dadosUsuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = {
            id: dadosUsuario.id,
            perfil: dadosUsuario.perfil
        };

        return next();

    } catch (erro) {
        return next(
            new AppError("Token inválido ou expirado!", 401)
        );
    }
}

module.exports = {
    autenticarUsuario
};