const CarService = require('../services/CarService');

module.exports = {
    searchAll: async (req, res) => {
        let json = {error: '', result:[]};

        let cars = await CarService.searchAll();

        for(let i in cars) {
            json.result.push({
                codigo: cars[i].codigo,
                modelo: cars[i].modelo,
                placa: cars[i].placa,
                cor: cars[i].cor,
                ano: cars[i].ano,
            });
        }
        res.json(json);
    },
    searchOne: async(req, res) => {
        let json = {error: '', result:{}};

        let code = req.params.codigo;
        let car = await  CarService.searchOne(code);

        if(car) {
            json.result = car;
        }
        res.json(json);
    },
    addCar: async (req, res) => {
        let json = { error: '', result: {} };

        let modelo = req.body.modelo;
        let placa = req.body.placa;
        let cor = req.body.cor;
        let ano = req.body.ano;

        if(modelo && placa && cor && ano) {
            let CarCode = await CarService.addCar(modelo, placa, cor, ano);
            json.result = {
                codigo: CarCode,
                modelo,
                placa,
                cor,
                ano
            }
        } else {
            json.error = 'Campos não enviados'
        }
        res.json(json);
    },
    updateCar: async(req, res) => {
        let json = {error: '', result:{}};

        let codigo = req.params.codigo;
        let modelo = req.body.modelo;
        let placa = req.body.placa;
        let cor = req.body.cor;
        let ano = req.body.ano;

        if(codigo && modelo && placa && cor && ano) {
            await CarService.updateCar(codigo, modelo, placa, cor, ano);
            json.result = {
                codigo,
                modelo,
                placa,
                cor,
                ano
            }
        } else {
            json.error = 'Campos não enviados'
        }
        res.json(json);
    },
    deleteCar: async(req, res) => {
        let json = {error: '', result:{}};

        await CarService.deleteCar(req.params.codigo);

        res.json(json);
    }
}
