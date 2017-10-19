module.exports = function(app){
	var itemController = app.controllers.item_controller;

	//app.get('/', cliente.index);
	//app.get('/itens', itemController.saveItem);
	app.get('/itens', itemController.getAllInDb);
	app.get('/itens/:idItem', itemController.getByIdInDb);
	//app.get('/inicio', itemController.inicial);

	return this;
};