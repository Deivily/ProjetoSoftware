module.exports = function(app){
	var ClienteModel = require('../models/cliente_model.js');

	this.saveClienteInDb = function(req, res, next) {
		var jsonCliente = req.body;
        new ClienteModel({
            'idCliente': jsonCliente.idCliente,
            'nome': jsonCliente.nome,
            'cpf': jsonCliente.cpf,
			'dataNascimento': jsonCliente.dataNascimento,
			'endereco': jsonCliente.endereco,
			'telefones': jsonCliente.telefones,
			'email': jsonCliente.email
        }).save(function(err, cliente) {
            if(err) {
				var erro = new Error('Falha ao salvar o cliente no banco de dados!');
				erro.status = 500;
				next(erro);
            } else {
				var objectId = cliente._id;
                res.json({"_id": objectId});
            }
        });
    };
	
	this.getAllInDb = function(req, res, next) {
		var condicoes = {};
		var projecao = {sort: {nomeCliente: 1}};
        ClienteModel.find(condicoes, null, projecao, function(err, resultQuery){
            if(err) {
				var erro = new Error('Falha na busca dos clientes no banco de dados!');
				erro.status = 500;
                next(erro);
            } else {
                var arrayClientes = [];
                
                for(var i in resultQuery) {
					var newCliente = new Object(), idCliente, nome, cpf, dataNascimento, endereco, telefones, email;
					newCliente.idCliente = resultQuery[i].idCliente;
					newCliente.nome = resultQuery[i].nome;
					newCliente.cpf = resultQuery[i].cpf;
					newCliente.dataNascimento = resultQuery[i].dataNascimento;
					newCliente.endereco = resultQuery[i].endereco;
					newCliente.telefones = resultQuery[i].telefones;
					newCliente.email = resultQuery[i].email;

                    arrayClientes.push(newCliente);
                }

                return res.json(arrayClientes);
            }
        });
	};

	this.getByIdInDb = function(req, res, next) {
		var idCliente = req.params.idCliente;
		var condicoes = {"idCliente": idCliente};
		ClienteModel.findOne(condicoes, function(err, resultQuery){
            if(resultQuery == null) {
				res.json(resultQuery);
				res.end();
			} else if(err != undefined) {
				var erro = new Error('Falha na busca pelo cliente com o id ' + idCliente + '!');
				erro.status = 500;
				next(erro);
            } else {       
				var cliente = new Object(), idCliente, nome, cpf, dataNascimento, endereco, telefones, email;     
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
        var condicoes = {"nome":nomeProcurado};
        ClienteModel.findOne(condicoes, function(err, resultQuery){
            if(resultQuery == null) {
                var erro = new Error('Falha na busca do cliente com o nome ' +'"' + nomeProcurado + '"' + ' no banco de dados!');
                next(erro);
            } else {
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
        var condicoes = {"nome": {$regex: nomeProcurado}};
        ClienteModel.find(condicoes, function(err, resultQuery){
            if(resultQuery.length < 1) {
                var erro = new Error('Falha na busca dos clientes com o nome similar a ' +'"' + req.params.nomeItem + '"' + ' no banco de dados!');
                next(erro);
            } else {
                var arrayClientes = [];
                for(var i in resultQuery) {
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
        var condicoes = {"idCliente":idProcurado};
        ClienteModel.findOne(condicoes, function(err, resultQuery) {
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

				clienteAtualizado.idCliente = 3;
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

                cliente = resultQuery;
                cliente.idCliente = clienteAtualizado.idCliente,
				cliente.nome = clienteAtualizado.nome,
				cliente.cpf = clienteAtualizado.cpf,
				cliente.dataNascimento = clienteAtualizado.dataNascimento,
				cliente.endereco = clienteAtualizado.endereco,
				cliente.telefones = clienteAtualizado.telefones,
				cliente.email = clienteAtualizado.email;

                cliente.save(function(err, respostaBanco) {
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
        var condicoes = {"idCliente":idProcurado};
        ClienteModel.findOneAndRemove(condicoes, function(err, resultQuery) {
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