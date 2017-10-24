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
		{telefone_1: '988322771'},
		{telefone_2: null},
		{telefone_3: null}
	];

	//this.saveClienteInDb(1, 'Deivily', '111.111.111-11', '1979-07-24', endereco, telefones, 'deivily@bol.com.br');
	
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

                    arrayClientes.push(cliente);
                }

                return res.json(arrayClientes);
            }
        });
	};
	
	this.getByIdInDb = function(req, res, next) {
        var criterioBusca = {"idCliente":req.params.idCliente};
        Cliente.findOne(criterioBusca, function(err, resultQuery){
            if(resultQuery == null) {
                var erro = new Error('Falha na busca do cliente com o id ' + req.params.idCliente + ' no banco de dados!');
                next(erro);
            } else {
                var cliente = new Object(),
				idCliente,
				nome,
				cpf,
				dataNascimento,
				endereco,
				telefones,
				email;

                cliente.idCliente = resultQuery.idCliente;
				cliente.nome = resultQuery.nome;
				cliente.cpf = resultQuery.cpf;
				cliente.dataNascimento = resultQuery.dataNascimento;
				cliente.endereco = resultQuery.endereco;
				cliente.telefones = resultQuery.telefones;
				cliente.email = resultQuery.email;
              
                return res.json(cliente);  
            }  
        });
	};
	
	this.getByNameInDb = function(req, res, next) {
        var nomeProcurado = req.params.nomeCliente;
        var criterioBusca = {"nome":nomeProcurado};
        Cliente.findOne(criterioBusca, function(err, resultQuery){
            if(resultQuery == null) {
                var erro = new Error('Falha na busca do cliente com o nome ' +'"' + req.params.nomeCliente + '"' + ' no banco de dados!');
                next(erro);
            } else {
                var cliente = new Object(),
				idCliente,
				nome,
				cpf,
				dataNascimento,
				endereco,
				telefones,
				email;

                cliente.idCliente = resultQuery.idCliente;
				cliente.nome = resultQuery.nome;
				cliente.cpf = resultQuery.cpf;
				cliente.dataNascimento = resultQuery.dataNascimento;
				cliente.endereco = resultQuery.endereco;
				cliente.telefones = resultQuery.telefones;
				cliente.email = resultQuery.email;
              
                return res.json(cliente);
            }  
        });
	};
	
	this.getByPartOfNameInDb = function(req, res, next) {
        var nomeProcurado = new RegExp('^' + req.params.nomeCliente + '.*', 'i');
        var criterioBusca = {"nome": {$regex: nomeProcurado}};
        Cliente.find(criterioBusca, function(err, resultQuery){
            if(resultQuery.length < 1) {
                var erro = new Error('Falha na busca dos clientes com o nome similar a ' +'"' + req.params.nomeItem + '"' + ' no banco de dados!');
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

                    arrayClientes.push(cliente);
                }

                return res.json(arrayClientes);  
            }  
        });
	};
	
	this.updateByIdInDb = function(req, res, next) {
        var idProcurado = req.params.idCliente;
        var criterioAtualizacao = {"idCliente":idProcurado};
        Cliente.findOne(criterioAtualizacao, function(err, resultQuery) {
            if(resultQuery == null) {
                var erro = new Error('O cliente com o id ' + idProcurado + ' não foi encontrado!');
                next(erro);
            } else {
				var clienteAtualizado = new Object(),
				idCliente = 2,
				nome,
				cpf,
				dataNascimento,
				endereco,
				telefones,
				email;

				clienteAtualizado.idCliente = 2;
				clienteAtualizado.nome = 'Deivily Lira';
				clienteAtualizado.cpf = '222.222.222-22';
				clienteAtualizado.dataNascimento = '01/01/2001';
				clienteAtualizado.endereco = [
						{rua: 'rua Z'},
						{numero: '74'},
						{bairro: 'Salgadinho'},
						{cidade: 'Olinda'},
						{estado: 'PE'},
						{cep: '53110-730'}
				]
				clienteAtualizado.telefones = [
					{telefone_1: '988888888'},
					{telefone_2: null},
					{telefone_3: null}
				]
				clienteAtualizado.email = 'deivily@uol.com.br';

                var cliente = resultQuery;
                cliente.idCliente = clienteAtualizado.idCliente,
				cliente.nome = clienteAtualizado.nome,
				cliente.cpf = clienteAtualizado.cpf,
				cliente.dataNascimento = clienteAtualizado.dataNascimento,
				cliente.endereco = clienteAtualizado.endereco,
				cliente.telefones = clienteAtualizado.telefones,
				cliente.email = clienteAtualizado.email;

                cliente.save(function(err, clienteAtualizado) {
                    if(err) {
                        var erro = new Error('Falha ao tentar atualizar o cliente com o id ' + idProcurado + "!");
                        next(erro);
                    } else {
                        res.write("<h1>Cliente com o id " + idProcurado + " atualizado!</h1>");
                        res.end();
                    }
                });  
            }
        });
	};
	
	this.removeByIdInDb = function(req, res, next) {
        var idProcurado = req.params.idCliente;
        var criterioRemocao = {"idCliente":idProcurado};
        Cliente.findOneAndRemove(criterioRemocao, function(err, resultQuery) {
            if(resultQuery == null) {
                var erro = new Error('Falha ao tentar remover o cliente com o id ' + idProcurado + "!");
                next(erro);
            } else {
                res.write("<h1>Cliente com o id " + idProcurado + " removido!</h1>");
                res.end();
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