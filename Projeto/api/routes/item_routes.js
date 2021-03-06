module.exports = function(app){
	var itemController = app.controllers.item_controller;

	app.post('/itens/salvar', itemController.saveItemInDb);
	app.get('/itens', itemController.getAllInDb);
	app.get('/itens/id/:idItem', itemController.getByIdInDb);
	app.get('/itens/nome/:nomeItem', itemController.getByNameInDb);
	app.put('/itens/atualizar/:idItem', itemController.updateByIdInDb);
	app.delete('/itens/remover/:idItem', itemController.removeByIdInDb);

	return this;
};