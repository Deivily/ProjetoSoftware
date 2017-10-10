module.exports = function(app){
	var user = app.controllers.user_controller;

	//app.get('/', user.inicial);
	app.get('/users', user.getAll);
	app.get('/users/:name', user.getByName);
	//app.get('/inicio', user.inicial);

	return this;
};