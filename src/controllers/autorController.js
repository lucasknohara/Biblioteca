const autorModel = require("../models/autorModel.js");
const autorService = require("../services/autorService.js");

async function buscarAutoresController(req, res) {
    try {
        const resultado = await autorService.buscarAutoresService();


        res.status(200).json(resultado);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Erro ao buscar autores!"
        });
    }
};

async function criarAutorController(req, res) {
    try {
        const { nome } = req.body;
        const resultado = await autorService.criarAutorService(nome);

        if (resultado === "Nome inválido!") {
            res.status(400).send("Nome inválido!");
            return;
        }

        if (resultado === "Autor não criado!") {
            res.status(500).send("Autor não criado!");
            return;
        }

        res.status(201).send(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Erro na criação!"
        });
    }
};

async function buscarAutorPorIdController(req, res) {
    try {
        const id = req.params.id;
        const resultado = await autorService.buscaAutorPorIdService(id);

        res.status(200).json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Erro ao buscar autor!"
        });
    }
};

module.exports = {
    buscarAutoresController,
    criarAutorController,
    buscarAutorPorIdController,
};