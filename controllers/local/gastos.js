const fs = require('fs');


exports.getAll = async (req, res) => {
    
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
  
    const data = JSON.parse(datajson);
    
    return res.send(data.gastos);
}


exports.getById = async (req, res) => {
    
    const id = req.params.id;
    
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    
    const data = JSON.parse(datajson);
   
    const gasto = data.gastos.find(gasto => gasto.id == id);

    if (gasto) {
        return res.send(gasto);
    } else {
        return res.status(404).send("Gasto não encontrado");
    }
}


exports.create = async (req, res) => {
    
    const {id, descricao, valor, data, categoria} = req.body;
   
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    
    const jsonData = JSON.parse(datajson);
    
    data.gastos.push(req.body);
   
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
   
    return res.status(201).send(req.body);
}


exports.update = async (req, res) => {
   
    const {id, descricao, valor, data, categoria} = req.body;
   
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
   
    const jsonData = JSON.parse(datajson);
    
    const gasto = data.gastos.find(gasto => gasto.id == id);
    
    if (gasto) {
        gasto.descricao = descricao;
        gasto.valor = valor;
        gasto.data = data;
        gasto.categoria = categoria;
  
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
       
        return res.send({id, descricao, valor, data, categoria});
    } else {
        return res.status(404).send("Gasto não encontrado");
    }
}


exports.delete = async (req, res) => {
  
    const id = req.params.id;
    
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
   
    const data = JSON.parse(datajson);
   
    const gastoIndex = data.gastos.findIndex(gasto => gasto.id == id);
   
    if (gastoIndex !== -1) {
        
        const apagaGasto = data.gastos.splice(gastoIndex, 1)[0];
        
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        
        return res.status(200).send(apagaGasto);
    } else {
        
        return res.status(404).send("Gasto não encontrado");
    }
}
