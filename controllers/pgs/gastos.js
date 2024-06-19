const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


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


exports.getAll = async (req, res) => {
    try {
     
        const response = await prisma.Gasto.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


exports.getById = async (req, res) => {
  
    const id = parseInt(req.params.id);
    try {
      
        const response = await prisma.Gasto.findUnique({
            where: {
                id: id,
            },
        });
     
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}


exports.create = async (req, res) => {
    
    const { descricao, valor, data, categoria } = req.body;
    try {
        
        const gasto = await prisma.Gasto.create({
            data: {
                descricao: descricao,
                valor: parseFloat(valor),
                data: new Date(data),
                categoria: categoria
            },
        });
       
        res.status(201).json(gasto);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


exports.update = async (req, res) => {
    const { id, descricao, valor, data, categoria } = req.body;
    try {
       
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
       
        res.status(200).json(gasto);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


exports.delete = async (req, res) => {
    
    const id = parseInt(req.params.id);
    try {
        
        await prisma.Gasto.delete({
            where: {
                id: id,
            },
        });
        
        res.status(200).send("ok");
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}