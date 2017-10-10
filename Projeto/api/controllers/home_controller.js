module.exports = function(app){

	this.home = function(req, res, next) {
		return res.render('index', {title: 'Express'});
	};

	return this;

};