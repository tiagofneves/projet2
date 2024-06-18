const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Testa a ligação
exports.testConnection = async (req, res) => {
    try {
        await prisma.$connect();
        res.send('Ligação bem-sucedida com o PostgreSQL!');
    } catch (error) {
        res.send('Erro ao conectar ao PostgreSQL:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Devolve todos os gastos
exports.getAll = async (req, res) => {
    try {
        // Lê toda a tabela
        const response = await prisma.Gasto.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Devolve um gasto indicado por um id
exports.getById = async (req, res) => {
    // Apanha o id enviado
    const id = parseInt(req.params.id);
    try {
        // Procura o gasto com o id
        const response = await prisma.Gasto.findUnique({
            where: {
                id: id,
            },
        });
        // Devolve o gasto
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

// Criar um gasto
exports.create = async (req, res) => {
    // Apanhar os dados enviados
    const { descricao, valor, data, categoria } = req.body;
    try {
        // Criar um novo gasto
        const gasto = await prisma.Gasto.create({
            data: {
                descricao: descricao,
                valor: parseFloat(valor),
                data: new Date(data),
                categoria: categoria
            },
        });
        // Devolve o gasto criado
        res.status(201).json(gasto);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Atualizar um gasto
exports.update = async (req, res) => {
    const { id, descricao, valor, data, categoria } = req.body;
    try {
        // Procurar o gasto com id e atualizar os dados
        const gasto = await prisma.Gasto.update({
            where: {
                id: parseInt(id),
            },
            data: {
                descricao: descricao,
                valor: parseFloat(valor),
                data: new Date(data),
                categoria: categoria
            },
        });
        // Devolve o gasto atualizado
        res.status(200).json(gasto);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Apagar o gasto com id passado
exports.delete = async (req, res) => {
    // Lê o id do gasto
    const id = parseInt(req.params.id);
    try {
        // Delete gasto
        await prisma.Gasto.delete({
            where: {
                id: id,
            },
        });
        // Just return ok
        res.status(200).send("ok");
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}