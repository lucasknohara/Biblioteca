const test = require("node:test");
const assert= require("node:assert/strict");
const livrosService = require("../src/services/livroService.js");
const livroModel = require("../src/models/livroModel.js");
const connection = require("../src/config/database.js");
const AppError = require("../src/errors/AppError.js");

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
            message: "Offset requer limit!",
            status: 400
        }    
    );
});

test("deve rejeitar devolução de livro disponível", async (t) => {
    const connFake = {
        beginTransaction: t.mock.fn(async () => {}),
        rollback: t.mock.fn(async () => {}),
        release: t.mock.fn()
    };

    t.mock.method(
        connection,
        "getConnection",
        async () => connFake
    );

    t.mock.method(
        livroModel,
        "buscarLivroParaEmprestimo",
        async () => [{ id: 1, disponivel: true }]
    );

    await assert.rejects(livrosService.devolverLivroService(1),
        {
            message: "Livro não emprestado!",
            status: 409
        }
    )

    assert.equal(connFake.rollback.mock.callCount(), 1);
    assert.equal(connFake.release.mock.callCount(), 1);
});

test("deve devolver um livro com sucesso", async (t) => {
    const connFake = {
        beginTransaction: t.mock.fn(async () => {}),
        rollback: t.mock.fn(async () => {}),
        release: t.mock.fn(),
        commit: t.mock.fn(async () => {})
    };

    t.mock.method(
        connection,
        "getConnection",
        async () => connFake
    );

    t.mock.method(
        livroModel,
        "buscarLivroParaEmprestimo",
        async () => [{ id: 1, disponivel: false }]
    );

    t.mock.method(
        livroModel,
        "buscarEmprestimoAtivo",
        async () => [{ id: 7 }]
    );

    t.mock.method(
        livroModel,
        "devolverEmprestimo",
        async () => ({ affectedRows: 1 })
    );

    t.mock.method(
        livroModel,
        "disponibilizarLivro",
        async () => ({ affectedRows: 1 })
    );

    const resultado = await livrosService.devolverLivroService(1);

    assert.deepEqual(resultado, { affectedRows: 1 });
    
    assert.equal(connFake.commit.mock.callCount(), 1);
    assert.equal(connFake.rollback.mock.callCount(), 0);
    assert.equal(connFake.release.mock.callCount(), 1);
});

test("deve desfazer a devolução se falhar ao disponibilizar o livro", async (t) => {
    const connFake = {
        beginTransaction: t.mock.fn(async () => {}),
        rollback: t.mock.fn(async () => {}),
        release: t.mock.fn(),
        commit: t.mock.fn(async () => {})
    };

    t.mock.method(
        connection,
        "getConnection",
        async () => connFake
    );

    t.mock.method(
        livroModel,
        "buscarLivroParaEmprestimo",
        async () => [{ id: 1, disponivel: false }]
    );

    t.mock.method(
        livroModel,
        "buscarEmprestimoAtivo",
        async () => [{ id: 7 }]
    );

    t.mock.method(
        livroModel,
        "devolverEmprestimo",
        async () => ({ affectedRows: 1 })
    );

    t.mock.method(
        livroModel,
        "disponibilizarLivro",
        async () => { throw new AppError("Falha ao atualizar livro!", 500) }
    );

        await assert.rejects(livrosService.devolverLivroService(1),
        {
            message: "Falha ao atualizar livro!",
            status: 500
        }
    )
    
    assert.equal(connFake.commit.mock.callCount(), 0);
    assert.equal(connFake.rollback.mock.callCount(), 1);
    assert.equal(connFake.release.mock.callCount(), 1);
});

test("deve desfazer a devolução quando nenhum empréstimo for atualizado", async (t) => {
    const connFake = {
        beginTransaction: t.mock.fn(async () => {}),
        rollback: t.mock.fn(async () => {}),
        release: t.mock.fn(),
        commit: t.mock.fn(async () => {})
    };

    const disponibilizarMock = t.mock.method(
        livroModel,
        "disponibilizarLivro",
        async () => ({ affectedRows: 1 })
    );

    t.mock.method(
        connection,
        "getConnection",
        async () => connFake
    );

    t.mock.method(
        livroModel,
        "buscarLivroParaEmprestimo",
        async () => [{ id: 1, disponivel: false }]
    );

    t.mock.method(
        livroModel,
        "buscarEmprestimoAtivo",
        async () => [{ id: 7 }]
    );

    t.mock.method(
        livroModel,
        "devolverEmprestimo",
        async () => ({ affectedRows: 0 })
    );

    await assert.rejects(livrosService.devolverLivroService(1),
        {
            message: "Não foi possivel atualizar livro!",
            status: 500
        }
    )

    assert.equal(disponibilizarMock.mock.callCount(), 0);
    assert.equal(connFake.commit.mock.callCount(), 0);
    assert.equal(connFake.rollback.mock.callCount(), 1);
    assert.equal(connFake.release.mock.callCount(), 1);
});

test("deve rejeitar devolução quando não existe empréstimo ativo", async (t) => {
    const connFake = {
        beginTransaction: t.mock.fn(async () => {}),
        rollback: t.mock.fn(async () => {}),
        release: t.mock.fn(),
        commit: t.mock.fn(async () => {})
    };

    t.mock.method(
        connection,
        "getConnection",
        async () => connFake
    );

    t.mock.method(
        livroModel,
        "buscarLivroParaEmprestimo",
        async () => [{ id: 1, disponivel: false }]
    );

    t.mock.method(
        livroModel,
        "buscarEmprestimoAtivo",
        async () => []
    );

    const disponibilizarMock = t.mock.method(
        livroModel,
        "devolverEmprestimo",
        async () => ({ affectedRows: 1 })
    );

    const disponibilizarLivroMock = t.mock.method(
        livroModel,
        "disponibilizarLivro",
        async () => ({ affectedRows: 1 })
    );

    await assert.rejects(livrosService.devolverLivroService(1),
        {
            message: "Não existe livro ativo para devolver!",
            status: 409
        }
    )

    assert.equal(disponibilizarMock.mock.callCount(), 0);
    assert.equal(disponibilizarLivroMock.mock.callCount(), 0);
    assert.equal(connFake.commit.mock.callCount(), 0);
    assert.equal(connFake.rollback.mock.callCount(), 1);
    assert.equal(connFake.release.mock.callCount(), 1);
});

test("deve rejeitar empréstimo quando o livro está indisponível", async (t) => {
        const connFake = {
        beginTransaction: t.mock.fn(async () => {}),
        rollback: t.mock.fn(async () => {}),
        release: t.mock.fn(),
        commit: t.mock.fn(async () => {})
    };

    t.mock.method(
        connection,
        "getConnection",
        async () => connFake
    );

    t.mock.method(
        livroModel,
        "buscarLivroParaEmprestimo",
        async () => [{ id: 1, disponivel: 0 }]
    );

    t.mock.method(
        livroModel,
        "registrarEmprestimo",
        async () => []
    );

    t.mock.method(
        livroModel,
        "emprestarLivro",
        async () => ({ affectedRows: 1 })
    );

    await assert.rejects(livrosService.emprestarLivroService(1),
        {
            message: "Livro indisponivel!",
            status: 409
        }
    );

    assert.equal(connFake.commit.mock.callCount(), 0);
    assert.equal(connFake.rollback.mock.callCount(), 1);
    assert.equal(connFake.release.mock.callCount(), 1);
});