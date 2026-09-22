const autorModel = require("../models/autorModel.js");
const autorService = require("../services/autorService.js");

async function buscarAutoresController(req, res) {
    try {
        const resultado = await autorService.buscarAutoresService();

        res.status(200).json(resultado);
    } catch (error) {
        console.log(error.message);
        res.status(error.status ?? 500).json({
            error: error.message
        });
    }
};

async function criarAutorController(req, res) {
    try {
        const { nome } = req.body;
        const resultado = await autorService.criarAutorService(nome);

        res.status(201).send(resultado);
    } catch (error) {
        console.log(error.message);
        res.status(error.status ?? 500).json({
            error: error.message
        });
    }
};

async function buscarAutorPorIdController(req, res) {
    try {
        const id = req.params.id;
        const resultado = await autorService.buscaAutorPorIdService(id);

        res.status(200).json(resultado);
    } catch (error) {
        console.log(error.message);
        res.status(error.status ?? 500).json({
            error: error.message
        });
    }
};

module.exports = {
    buscarAutoresController,
    criarAutorController,
    buscarAutorPorIdController,
};