const fs = require('fs');

// Devolve todos os gastos
exports.getAll = async (req, res) => {
    // Ler o ficheiro local
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    // Parse do JSON
    const data = JSON.parse(datajson);
    // Devolver os gastos
    return res.send(data.gastos);
}

// Devolve o gasto com o id
exports.getById = async (req, res) => {
    // Obter o id do gasto
    const id = req.params.id;
    // Ler o ficheiro local
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    // Parse do JSON
    const data = JSON.parse(datajson);
    // Procurar um gasto com o id
    const gasto = data.gastos.find(gasto => gasto.id == id);
    // Devolve o gasto
    if (gasto) {
        return res.send(gasto);
    } else {
        return res.status(404).send("Gasto não encontrado");
    }
}

// Cria um gasto
exports.create = async (req, res) => {
    // Obter o gasto pelas características enviadas
    const {id, descricao, valor, data, categoria} = req.body;
    // Ler o ficheiro local
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    // Parse do JSON
    const jsonData = JSON.parse(datajson);
    // Adicionar gasto à lista
    data.gastos.push(req.body);
    // Criar o novo ficheiro com o gasto adicionado
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    // Devolver o novo gasto
    return res.status(201).send(req.body);
}

// Atualiza o gasto
exports.update = async (req, res) => {
    // Obter o gasto pelas características enviadas
    const {id, descricao, valor, data, categoria} = req.body;
    // Ler o ficheiro local
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    // Parse do JSON
    const jsonData = JSON.parse(datajson);
    // Procurar o gasto para atualizar
    const gasto = data.gastos.find(gasto => gasto.id == id);
    // Atualizar as características
    if (gasto) {
        gasto.descricao = descricao;
        gasto.valor = valor;
        gasto.data = data;
        gasto.categoria = categoria;
        // Atualizar no ficheiro JSON
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        // Devolver o gasto alterado
        return res.send({id, descricao, valor, data, categoria});
    } else {
        return res.status(404).send("Gasto não encontrado");
    }
}

// Apaga o gasto com o id
exports.delete = async (req, res) => {
    // Obter o id do gasto
    const id = req.params.id;
    // Ler o ficheiro local
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    // Parse do JSON
    const data = JSON.parse(datajson);
    // Procurar o índice do gasto a ser procurado
    const gastoIndex = data.gastos.findIndex(gasto => gasto.id == id);
    // Verifique se o gasto foi encontrado
    if (gastoIndex !== -1) {
        // Exclua o gasto do array de gastos
        const apagaGasto = data.gastos.splice(gastoIndex, 1)[0];
        // Atualize o ficheiro JSON
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        // Retorne o gasto excluído como resposta
        return res.status(200).send(apagaGasto);
    } else {
        // Caso o gasto não seja encontrado, retorne uma resposta de erro
        return res.status(404).send("Gasto não encontrado");
    }
}
