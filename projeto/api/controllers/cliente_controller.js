module.exports = function(app){
	var Cliente = require('../models/cliente_model.js');

	this.saveClienteInDb = function(idCliente, nome, cpf, dataNascimento, endereco, telefones, email) {
        new Cliente({
            'idCliente': idCliente,
            'nome': nome,
            'cpf': cpf,
			'dataNascimento': dataNascimento,
			'endereco': endereco,
			'telefones': telefones,
			'email': email
        }).save(function(err, cliente) {
            if(err) {
                console.log('Falha ao salvar o cliente no banco de dados!');
            } else {
                console.log('Cliente salvo no banco de dados!');
            }
        });
    };
	var endereco = [
		{rua: 'rua B'},
		{numero: '74'},
		{bairro: 'Salgadinho'},
		{cidade: 'Olinda'},
		{estado: 'PE'},
		{cep: '53110-730'}
	];
    var telefones = [
		{telefone1: '988322771'},
		{telefone2: null},
		{telefone3: null}
	];

	//this.saveClienteInDb(1, 'Deivily', '111.111.111-11', '02/07/1979', endereco, telefones, 'deivily@bol.com.br');
	
	this.getAllInDb = function(req, res, next) {
        Cliente.find({}, function(err, resultQuery){
            if(err) {
                var erro = new Error('Falha na busca dos clientes no banco de dados!');
                next(erro);
            } else {
                var arrayClientes = [];
                
                for(var i in resultQuery) {
                    var cliente = new Object(),
                    idCliente,
					nome,
					cpf,
					dataNascimento,
					endereco,
					telefones,
					email;

					cliente.idCliente = resultQuery[i].idCliente;
					cliente.nome = resultQuery[i].nome;
					cliente.cpf = resultQuery[i].cpf;
					cliente.dataNascimento = resultQuery[i].dataNascimento;
					cliente.endereco = resultQuery[i].endereco;
					cliente.telefones = resultQuery[i].telefones;
					cliente.email = resultQuery[i].email;
                    arrayItens.push(cliente);
                }

                return res.json(arrayClientes);
            }
        });
    };
	
	/*cliente.salvarCliente(cliente);

	this.getAll = function(req, res, next) {
		var clientes = cliente.findAll();
		return res.json(clientes);
	};

	this.getByName = function(req, res, next) {
		var resultadoBusca = cliente.findByName(req.params.name);
		return res.json(resultadoBusca);
	};

	this.getById = function(idCliente) {
		var resultadoBusca = cliente.findById(idCliente);
		return resultadoBusca;
	};

	this.inicial = function(req, res, next) {
		return res.render('index', {title: 'Express'});
	};*/

	return this;

};