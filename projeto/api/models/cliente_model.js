var mongoose = require('mongoose');
var clienteSchema = mongoose.Schema;
    
var Cliente = new clienteSchema({
    idCliente: Number,
    nome: String,
    cpf: String,
    dataNascimento: Date,
    endereco: Array,
    telefones: Array,
    email: String
});
        
    
    /*var repClientes = [];

        this.salvarCliente = function(cliente) {
            repClientes.push(cliente);
        };

        this.findAll = function() {
            return repClientes;
        };
    
        this.findByName = function(name) {
            for(var i in repClientes) {
                if(repClientes[i].nome.toLowerCase() === name.toLowerCase()) {
                    return repClientes[i];
                }
            }
        };

        this.findById = function(idCliente) {
            for(var i in repClientes) {
                if(repClientes[i].idCliente == idCliente) {
                    return repClientes[i];
                }
            }
        };
    };*/
    
    module.exports = mongoose.model('Cliente', Cliente);