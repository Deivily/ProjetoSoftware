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
            for(var cliente in repClientes) {
                if(repClientes[cliente].nome.toLowerCase() === name.toLowerCase()) {
                    return repClientes[cliente];
                }
            }
        };

        this.findById = function(idCliente) {
            for(var cliente in repClientes) {
                if(repClientes[cliente].idCliente === idCliente) {
                    return repClientes[cliente];
                }
            }
        };
    };
    
    module.exports = Cliente;