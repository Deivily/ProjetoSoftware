module.exports = function(app){
	var locacaoController = app.controllers.locacao_controller;

	//app.get('/', cliente.index);
	app.get('/locacoes', locacaoController.getAllInDb);
	app.get('/locacoes/id/:idLocacao', locacaoController.getByIdInDb);
	app.get('/locacoes/atualizar/:idLocacao', locacaoController.updateByIdInDb);
	app.get('/locacoes/remover/:idLocacao', locacaoController.removeByIdInDb);
	//app.get('/inicio', locacaoControler.inicial);

	return this;
};