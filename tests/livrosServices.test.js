const test = require("node:test");
const assert= require("node:assert/strict");
const livrosService = require("../src/services/livroService.js");
const livroModel = require("../src/models/livroModel.js");

test("deve rejeitar um ano inválido!", async () => {
    await assert.rejects(livrosService.buscaLivrosService("2020", undefined, undefined, undefined, undefined), 
        {
            message: "Ano inválido!",
            status: 400
        }
    );
});

test("deve retornar livros e paginação com dados válidos", async (t) => {
    const livrosFicticios = [
        { id: 1, titulo: "Dom Casmurro", ano: 2020 },
        { id: 2, titulo: "Livro de exemplo", ano: 2020 }
    ];

    t.mock.method(
        livroModel,
        "buscarLivros",
        async () => livrosFicticios
    );

    t.mock.method(
        livroModel,
        "contaLivros",
        async () => 8
    );

    const busca = await livrosService.buscaLivrosService(
        2020,
        undefined,
        undefined,
        2,
        0
    );

    assert.deepEqual(busca, {
        data: livrosFicticios,
        pagination: {
            limit: 2,
            offset: 0,
            total: 8
        }
    });
});

test("Deve rejeitar offset sem limit!", async () => {
    await assert.rejects(livrosService.buscaLivrosService(undefined, undefined, undefined, undefined, 2),
        {
            message: "Offset requer o limit!",
            status: 400
        }    
    );
});