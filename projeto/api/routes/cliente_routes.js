module.exports = function(app){
	var cliente = app.controllers.cliente_controller;

	//app.get('/', cliente.index);
	app.get('/clientes', cliente.getAll);
	app.get('/clientes/:name', cliente.getByName);
	//app.get('/inicio', cliente.inicial);

	return this;
};