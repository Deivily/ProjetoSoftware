module.exports = function(app){
	var clienteModel = app.models.cliente_model;
	var Cliente = require('../models/cliente_model');
	var endereco = [
		{rua: 'rua B'},
		{numero: '74'},
		{bairro: 'Salgadinho'},
		{cidade: 'Olinda'},
		{estado: 'PE'},
		{cep: '53110-730'}
	];
    var telefones = [
		{telefone1: '988322771'},
		{telefone2: null},
		{telefone3: null}
	];
	var cliente = new Cliente(1, 'Deivily', '111.111.111-11', '02/07/1979', endereco, telefones, 'deivily@bol.com.br');
	cliente.salvarCliente(cliente);

	this.getAll = function(req, res, next) {
		var clientes = cliente.findAll();
		return res.json(clientes);
	};

	this.getByName = function(req, res, next) {
		var resultadoBusca = cliente.findByName(req.params.name);
		return res.json(resultadoBusca);
	};

	this.getById = function(idCliente) {
		var resultadoBusca = cliente.findById(idCliente);
		return resultadoBusca;
	};

	this.inicial = function(req, res, next) {
		return res.render('index', {title: 'Express'});
	};

	return this;

};