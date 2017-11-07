var mongoose = require('mongoose');
var dbString = 'mongodb://localhost/ProjetoSoftware';
mongoose.connect(dbString, function(err, res) {
    if(err) {
       var erro = new Error('Falha na comunicação com o banco de dados!');
       console.log('Erro na conexão com o banco!');
    } else {
        console.log('Conectado ao banco de dados: ' + dbString + '.');
    }
});