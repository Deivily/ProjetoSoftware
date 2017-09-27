module.exports = function(app){
	var userModel = app.models.user_model;

	this.index = function(req, res, next) {
		return res.redirect('/users');
	};

	this.getAll = function(req, res, next) {
		var users = userModel.findAll();
		return res.json(users);
	};

	this.getByName = function(req, res, next) {
		var user = userModel.findByName(req.params.name);
		return res.json(user);
	};

	this.inicial = function(req, res, next) {
		return res.render('index', {title: 'Express'});
	};

	return this;

};