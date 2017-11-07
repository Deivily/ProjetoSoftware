module.exports = function(app){
    var homeController = app.controllers.home_controller;

	app.get('/', homeController.home);
    app.get('/inicio', homeController.home);

	return this;
};