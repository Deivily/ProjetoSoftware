module.exports = function(app){
	var clienteController = app.controllers.cliente_controller;

	//app.get('/', cliente.index);
	app.get('/clientes', clienteController.getAllInDb);
	app.get('/clientes/id/:idCliente', clienteController.getByIdInDb);
	app.get('/clientes/nome/:nomeCliente', clienteController.getByNameInDb);
	app.get('/clientes/parte_nome/:nomeCliente', clienteController.getByPartOfNameInDb);
	app.get('/clientes/atualizar/:idCliente', clienteController.updateByIdInDb);
	app.get('/clientes/remover/:idCliente', clienteController.removeByIdInDb);
	//app.get('/inicio', cliente.inicial);

	return this;
};