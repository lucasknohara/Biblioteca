const bcrypt = require("bcrypt");
const usuarioModel = require("../models/usuarioModel.js");
const AppError = require("../errors/AppError.js");

async function criarUsuarioService(nome, email, senha) {
    if (typeof nome !== "string" || nome.trim() === "") {
        throw new AppError("Nome inválido!", 400);
    }

    if (typeof senha !== "string" || senha.trim() === "" || senha.length < 8) {
        throw new AppError("Senha inválida!", 400);
    }

    if (typeof email !== "string" || email.trim() === "") {
        throw new AppError("Email inválido!", 400);
    }

    const emailNormalizado = email.trim().toLowerCase();
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNormalizado);

    if (!emailValido) {
        throw new AppError("Email inválido!", 400);
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const resultado = await usuarioModel.criarUsuario(nome.trim(), emailNormalizado, senhaHash);

    return {
        id: resultado.insertId,
        nome: nome.trim(),
        email: emailNormalizado
    };
};

module.exports = {
    criarUsuarioService,
};