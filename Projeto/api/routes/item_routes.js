module.exports = function(app){
	var itemController = app.controllers.item_controller;

	//app.get('/', cliente.index);
	//app.get('/itens/salvar', itemController.saveItemInDb);
	app.get('/itens', itemController.getAllInDb);
	app.get('/itens/id/:idItem', itemController.getByIdInDb);
	app.get('/itens/nome/:nomeItem', itemController.getByNameInDb);
	app.get('/itens/parte_nome/:nomeItem', itemController.getByPartOfNameInDb);
	app.get('/itens/remover/:idItem', itemController.removeByIdInDb);
	//app.get('/inicio', itemController.inicial);

	return this;
};