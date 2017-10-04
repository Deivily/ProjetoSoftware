    function Cliente(idCliente, nome, cpf, dataNascimento, endereco, telefones, email) {
        this.idCliente = idCliente;
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.endereco = endereco;
        this.telefones = telefones;
        this.email = email;
        var repClientes = [];

        this.salvarCliente = function(cliente) {
            repClientes.push(cliente);
        };

        this.findAll = function() {
            return repClientes;
        };
    
        this.findByName = function(name) {
            for(var cli in repClientes) {
                if(repClientes[cli].nome.toLowerCase() === name.toLowerCase()) {
                    return repClientes[cli];
                }
            }
        };
    };
    
    module.exports = Cliente;