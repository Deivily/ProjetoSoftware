module.exports = function(app){
	var users = [
		{name: 'Deivily'},
		{name: 'Santos'},
		{name: 'Lira'}
	];

	this.findAll = function() {
		return users;
	};

	this.findByName = function(name) {
		for(var u in users) {
			if(users[u].name.toLowerCase() === name.toLowerCase()) {
				return users[u];
			}
		}
	};

	return this;
};
