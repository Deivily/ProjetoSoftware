module.exports = function(app){
	var itemController = app.controllers.item_controller;
	var bodyParser = app.bodyParser;

	//app.get('/', cliente.index);
	app.post('/itens/salvar', itemController.saveItemInDb);
	app.get('/itens', itemController.getAllInDb);
	app.get('/itens/id/:idItem', itemController.getByIdInDb);
	app.get('/itens/nome/:nomeItem', itemController.getByNameInDb);
	app.get('/itens/parte_nome/:nomeItem', itemController.getByPartOfNameInDb);
	app.get('/itens/atualizar/:idItem', itemController.updateByIdInDb);
	app.get('/itens/remover/:idItem', itemController.removeByIdInDb);
	//app.get('/inicio', itemController.inicial);

	return this;
};