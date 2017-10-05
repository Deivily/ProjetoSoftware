module.exports = function(app){
    var itemModel = app.models.item_model;
    var Item = require('../models/item_model.js');
    var item = new Item(1, 'Ben 10' , 'R$15', true);
    item.salvarItem(item);

    this.getAll = function(req, res, next) {
        var itens = item.findAll();
		return res.json(itens);
    };

	this.getByName = function(req, res, next) {
		var resultadoBusca = cliente.findByName(req.params.name);
		return res.json(resultadoBusca);
	};

	this.inicial = function(req, res, next) {
		return res.render('index', {title: 'Express'});
    };
    
    return this;
};