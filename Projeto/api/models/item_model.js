var mongoose = require('mongoose');
var itemSchema = mongoose.Schema;
var Item = new itemSchema({
    idItem: Number,
    descricaoItem: String,
    valorLocacao: Number,
    disponibilidadeItem: Boolean
});

/*function Item(idItem, descricaoItem, valorLocacao, disponibilidadeItem) {
    this.idItem = idItem;
    this.descricaoItem = descricaoItem;
    this.valorLocacao = valorLocacao;
    this.disponibilidadeItem = disponibilidadeItem;
    var repItens = [];

    this.salvarItem = function(item) {
        repItens.push(item);
    };

    this.removerItem = function(idItem) {
        for(var i in repItens) {
            if(repItens[i].idItem == idItem) {
                repItens.pop(repItens[i]); 
            }
        }
    }

    this.findAll = function() {
        return repItens;
    };

    this.findByName = function(name) {
        for(var i in repItens) {
            if(repItens[i].nome.toLowerCase() === name.toLowerCase()) {
                return repItens[i];
            }
        }
    };

    this.findById = function(idItem) {
        for(var i in repItens) {
            if(repItens[i].idItem == idItem) {
                return repItens[i];
            }
        }
    };
};*/
module.exports = mongoose.model('Item', Item);