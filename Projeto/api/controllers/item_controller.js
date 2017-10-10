module.exports = function(app){
    var Item = require('../models/item_model.js');
    var item = new Item(1, 'Painel Ben 10' , 'R$15', true);
    item.salvarItem(item);

    this.getAll = function(req, res, next) {
        var itens = item.findAll();
		return res.json(itens);
    };

	this.getByName = function(req, res, next) {
		var resultadoBusca = item.findByName(req.params.name);
		return res.json(resultadoBusca);
    };
    
    this.getById = function(idItem) {
		var resultadoBusca = item.findById(idItem);
		return resultadoBusca;
	};

	this.inicial = function(req, res, next) {
		return res.render('index', {title: 'Express'});
    };
    
    return this;
};