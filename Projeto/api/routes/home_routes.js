module.exports = function(app){
    var controller = app.controllers.home_controller;

	app.get('/', controller.home);
    app.get('/inicio', controller.home);

	return this;
};