const bcrypt = require("bcrypt");
const usuarioModel = require("../models/usuarioModel.js");
const AppError = require("../errors/AppError.js");
const jwt = require("jsonwebtoken");

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

async function loginUsuarioService(email, senha) {
    const buscarUsuario = await usuarioModel.buscarUsuarioPorEmail(email);
    
    if (buscarUsuario === null) {
        throw new AppError("Email ou senha inválidos!", 401);
    }

    const senhaCorreta = await bcrypt.compare(senha, buscarUsuario.senha_hash);
    
    if (!senhaCorreta) {
        throw new AppError("Email ou senha inválidos!", 401);
    }

    const token = jwt.sign(
        {
            id: buscarUsuario.id,
            perfil: buscarUsuario.perfil
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    return {
        id: buscarUsuario.id,
        nome: buscarUsuario.nome,
        email: buscarUsuario.email,
        token: token
    }
};

module.exports = {
    criarUsuarioService,
    loginUsuarioService,
};