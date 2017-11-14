module.exports = function(app){
	var clienteController = app.controllers.cliente_controller;

	app.post('/clientes/salvar', clienteController.saveClienteInDb);
	app.get('/clientes', clienteController.getAllInDb);
	app.get('/clientes/id/:idCliente', clienteController.getByIdInDb);
	app.get('/clientes/nome/:nomeCliente', clienteController.getByNameInDb);
	app.put('/clientes/atualizar/:idCliente', clienteController.updateByIdInDb);
	app.get('/clientes/remover/:idCliente', clienteController.removeByIdInDb);

	return this;
};