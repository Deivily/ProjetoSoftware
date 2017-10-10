module.exports = function(app){
	var itemController = app.controllers.item_controller;

	//app.get('/', cliente.index);
	app.get('/itens', itemController.getAll);
	app.get('/itens/:name', itemController.getByName);
	//app.get('/inicio', itemController.inicial);

	return this;
};