module.exports = function(app){
	var cliente = app.controllers.cliente_controller;

	//app.get('/', cliente.index);
	app.get('/clientes', cliente.getAllInDb);
	app.get('/clientes/id/:idCliente', cliente.getByIdInDb);
	app.get('/clientes/nome/:nomeCliente', cliente.getByNameInDb);
	app.get('/clientes/parte_nome/:nomeCliente', cliente.getByPartOfNameInDb);
	//app.get('/inicio', cliente.inicial);

	return this;
};