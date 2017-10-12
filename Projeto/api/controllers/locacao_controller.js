module.exports = function(app){
    var itemController = app.controllers.item_controller;
    var clienteController = app.controllers.cliente_controller;
    var Locacao = require('../models/locacao_model.js');
    var Cliente = require('../models/cliente_model.js');
    var Item = require('../models/item_model.js');
    var idItens = [];
    idItens.push(1);
    idItens.push(2);
    var locacao = new Object(Locacao);
    var locacao_1 = new Locacao(1, 1, idItens, '10/10/17', '11/10/17');

    this.makeLocacao = function(newLocacao) {
        locacao.saveLocacao(newLocacao);
    };

    this.makeLocacao(locacao_1);

    this.getAll = function(req, res, next) {
        var resultadoBuscaLocacoes = locacao.findAll();
        var dadosLocacoes = new Object(),
            cliente,
            itens,
            dataInicio,
            dataFim;

        for(var i in resultadoBuscaLocacoes) {
            if(clienteController.getById(resultadoBuscaLocacoes[i].idCliente) !== undefined) {
                resultadoBuscaCliente = clienteController.getById(resultadoBuscaLocacoes[i].idCliente);
                dadosLocacoes.cliente = resultadoBuscaCliente;
            } else {
                cliente = null;
            }

            dadosLocacoes.itens = [];
            for(var j in resultadoBuscaLocacoes[i].idItens) {
                resultadoBuscaItem = itemController.getById(resultadoBuscaLocacoes[i].idItens[j]);
                if(resultadoBuscaItem !== undefined) {
                    dadosLocacoes.itens.push(resultadoBuscaItem);
                } else {
                    dadosLocacoes.itens.push(null);
                } 
            }
        }
		return res.json(dadosLocacoes);
    };

	this.getByidLocacao = function(req, res, next) {
        var resultadoBuscaLocacao = locacao.findByIdLocacao(req.params.idLocacao);
        var dadosLocacao = new Object(),
        cliente,
        itens,
        dataInicio,
        dataFim;
        
        if(clienteController.getById(resultadoBuscaLocacao.idCliente) !== undefined) {               
            resultadoBuscaCliente = clienteController.getById(resultadoBuscaLocacao.idCliente);
            dadosLocacao.cliente = resultadoBuscaCliente;
        } else {
            cliente = null;
        }
        dadosLocacao.itens = [];
        for(var i in resultadoBuscaLocacao.idItens) {
            resultadoBuscaItem = itemController.getById(resultadoBuscaLocacao.idItens[i]);
            if(resultadoBuscaItem !== undefined) {
                dadosLocacao.itens.push(resultadoBuscaItem);
            } else {
                dadosLocacao.itens.push(null);
            } 
        }
		return res.json(dadosLocacao);
	};

	this.inicial = function(req, res, next) {
		return res.render('index', {title: 'Express'});
    };
    
    return this;
};