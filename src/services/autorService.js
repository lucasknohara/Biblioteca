const autorModel = require("../models/autorModel.js");
const AppError = require("../errors/AppError.js");

async function buscarAutoresService() {
    const resultado = await autorModel.buscarAutores();

    return resultado;
};

async function criarAutorService(nome) {
    if (typeof nome !== "string" || nome.trim().length === 0) {
        throw new AppError("Nome inválido!", 400);
    }

    const resultado = await autorModel.criarAutor(nome);

    if (resultado.affectedRows === 1) {
        return resultado;
    }

    throw new AppError("Autor não criado!", 500);
};
async function buscaAutorPorIdService(id) {
    const resultado = await autorModel.buscarAutorPorId(id);

    if (resultado.length === 0) {
        throw new AppError("Autor não encontrado!", 404)
    }

    return resultado;
};

module.exports = {
    buscarAutoresService,
    criarAutorService,
    buscaAutorPorIdService,
};