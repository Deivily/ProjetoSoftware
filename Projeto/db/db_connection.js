var mongoose = require('mongoose');
var dbString = 'mongodb://localhost/ProjetoSoftware';
mongoose.connect(dbString, function(err, res) {
    if(err) {
        console.log('Falha na conexão com o banco de dados: ' + dbString + ' !');
    } else {
        console.log('Conectado ao banco de dados: ' + dbString + ' .');
    }
});