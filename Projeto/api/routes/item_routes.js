module.exports = function(app){
	var item = app.controllers.item_controller;

	//app.get('/', cliente.index);
	app.get('/itens', item.getAll);
	app.get('/itens/:name', item.getByName);
	app.get('/inicio', item.inicial);

	return this;
};