module.exports = function(app){
	var clienteModel = app.models.cliente_model;

	/*this.index = function(req, res, next) {
		return res.redirect('/clientes');
	};*/

	this.getAll = function(req, res, next) {
		var clientes = clienteModel.findAll();
		return res.json(clientes);
	};

	this.getByName = function(req, res, next) {
		var cliente = clienteModel.findByName(req.params.name);
		return res.json(cliente);
	};

	this.inicial = function(req, res, next) {
		return res.render('index', {title: 'Express'});
	};

	return this;

};