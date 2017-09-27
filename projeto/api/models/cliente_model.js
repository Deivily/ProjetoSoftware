module.exports = function(app) {
    function Cliente (idCliente, nome, cpf, dataNascimento, endereco, telefones, email) {
        this.idCliente = idCliente;
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.endereco = endereco;
        this.telefones = telefones;
        this.email = email;

        this.getIdCliente = function() {
            return this.idCliente;
        };

        this.getNome = function() {
            return this.nome;
        };

        this.getCpf = function() {
            return this.cpf;
        };
        
        this.getDataNascimento = function() {
            return this.dataNascimento;
        };

        this.getEndereco = function() {
            return this.endereco;
        };

        this.getTelefones = function() {
            return this.telefones;
        };

        this.getEmail = function() {
            return this.email;
        };

        this.setIdCliente = function(newIdCliente) {
            this.idCliente = newIdCliente;
        };

        this.setNome = function(newNome) {
            this.nome = newNome;
        };

        this.setCpf = function(newCpf) {
            this.cpf = newCpf;
        };

        this.setDataNascimento = function(newDataNascimento) {
            this.dataNascimento = newDataNascimento;
        };

        this.setEndereco = function(newEndereco) {
            this.endereco = newEndereco;
        };

        this.setTelefones = function(newTelefones) {
            this.telefones = newTelefones;
        };

        this.setEmail = function(newEmail) {
            this.email = newEmail;
        };        
    };

    function Endereco(rua, numero, bairro, cidade, estado, cep) {
        this.rua = rua;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.cep = cep;
    };

    function Telefones(telefone_1, telefone_2, telefone_3, telefone_4) {
        this.telefone_1 = telefone_1;
        this.telefone_2 = telefone_2;
        this.telefone_3 = telefone_3;
        this.telefone_4 = telefone_4;

    };

    var repClientes = [];
    var endereco = new Endereco('rua B', 74, 'Salgadinho', 'Olinda', 'PE', '53110-730');
    var telefones = new Telefones(988322771, null, null, null);
    var cliente = new Cliente(1, 'Deivily', '111.111.111-11', '02/07/1979', endereco, telefones, 'deivily@bol.com.br');

    repClientes.push(cliente);
    
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

    return this;
};