const connection = require("../config/database.js");

async function criarUsuario(nome, email, senhaHash) {
    const [resultado] = await connection.query("INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)", [nome, email, senhaHash]);

    return resultado;
};

async function buscarUsuarioPorEmail(email) {
    const [resultado] = await connection.query("SELECT id, nome, email, senha_hash, perfil FROM usuarios WHERE email = ?", [email]);

    return resultado[0] || null;
};

module.exports = {
    criarUsuario,
    buscarUsuarioPorEmail,
};