var mongoose = require('mongoose');
var locacaoSchema = mongoose.Schema;

var Locacao = new locacaoSchema({
    idLocacao: Number,
    idCliente: Number,
    nomeCliente: String,
    cpf: String,
    itens: Array,
    dataInicio: Date,
    dataFim: Date
});
   

    /*this.saveLocacao = function(locacao) {
        repLocacoes.push(locacao);
    };

    this.findAll = function() {
        return repLocacoes;
    };

    this.findByIdLocacao = function(idLocacao) {
        for(var i in repLocacoes) {
            if(repLocacoes[i].idLocacao == idLocacao) {
                return repLocacoes[i];
            }
        }
    };
    
    this.findByIdCliente = function(idCliente) {
        for(var i in repLocacoes) {
            if(repLocacoes[i].idCliente == idCliente) {
                return repLocacoes[i];
            }
        }
    };
};*/

module.exports = mongoose.model('Locacao', Locacao);