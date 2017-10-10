module.exports = function(app){
    var Locacao = require('../models/locacao_model.js');
    var listaItens = [{item1: 1}, {item2: 2}, {item3: 3}];
    var locacao = new Locacao(null, null, null, null, null);
    var newLocacao = new Locacao(1, 2, listaItens, '10/10/17', '11/10/17');
    var teste;

    this.makeLocacao = function(newLocacao) {
        locacao.saveLocacao(newLocacao);
    };

    this.makeLocacao(newLocacao);

    this.getAll = function(req, res, next) {
        var locacoes = locacao.findAll();
		return res.json(locacoes);
    };

	this.getByidLocacao = function(req, res, next) {
		var resultadoBusca = locacao.findByIdLocacao(req.params.idLocacao);
		return res.json(resultadoBusca);
	};

	this.inicial = function(req, res, next) {
		return res.render('index', {title: 'Express'});
    };
    
    return this;
};