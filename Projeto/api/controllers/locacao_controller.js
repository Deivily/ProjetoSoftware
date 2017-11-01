module.exports = function(app){
    var LocacaoModel = require('../models/locacao_model.js');
    var locacao = new Object(), idLocacao, idCliente, nomeCliente, cpf, itens, dataInicio, dataFim;

    this.saveLocacaoInDb = function(idLocacao, idCliente, nomeCliente, cpf, itens, dataInicio, dataFim) {
        new LocacaoModel({
            'idLocacao': idLocacao,
            'idCliente': idCliente,
            'nomeCliente': nomeCliente,
            'cpf': cpf,
            'itens': itens,
            'dataInicio': dataInicio,
            'dataFim': dataFim
        }).save(function(err, locacao) {
            if(err) {
                console.log('Falha ao salvar a locacao no banco de dados!');
                console.log(err);
            } else {
                console.log('Locacao salva no banco de dados!');
            }
        });
    };
    var idLocacao = 1;
    var idCliente = 1;
    var nomeCliente = 'Deivily';
    var cpf = '111.111.111-11';
    var itens = [{idItem: 1, descricaoItem: 'Painel Ben 10', valorLocacao: 10, disponibilidadeItem: true}];
    var dataInicio = '2017-10-24';
    var dataFim = '2017-10-25';

    //this.saveLocacaoInDb(idLocacao, idCliente, nomeCliente, cpf, itens, dataInicio, dataFim);

    this.getAllInDb = function(req, res, next) {
        var condicoes = {};
        var campos = {_id: 0, __v: 0}
        LocacaoModel.find(condicoes, campos, function(err, resultQuery){
            if(err) {
                var erro = new Error('Falha na busca das locações no banco de dados!');
                next(erro);
            } else {  
                return res.json(resultQuery);
            }
        });
    };

    this.getByIdInDb = function(req, res, next) {
		var idLocacao = req.params.idLocacao;
		var condicoes = {"idLocacao": idLocacao};
		LocacaoModel.findOne(condicoes, function(err, resultQuery){
            if(resultQuery == null || err) {
				var erro = 'Falha na busca pela locação com o id ' + idLocacao + '!';
				next(erro);
            } else {
                locacao.idLocacao = resultQuery.idLocacao;            
                locacao.idCliente = resultQuery.idCliente;
				locacao.nomeCliente = resultQuery.nomeCliente;
				locacao.cpf = resultQuery.cpf;
                locacao.itens = resultQuery.itens;
                locacao.dataInicio = resultQuery.dataInicio;
                locacao.dataFim = resultQuery.dataFim;
				
				return res.json(locacao);
			}
		});
    };
    
    this.updateByIdInDb = function(req, res, next) {
        var idProcurado = req.params.idLocacao;
        var condicoes = {"idLocacao":idProcurado};
        LocacaoModel.findOne(condicoes, function(err, resultQuery) {
            if(resultQuery == null || err) {
                var erro = new Error('A locação com o id ' + idProcurado + ' não foi encontrada!');
                next(erro);
            } else {
                var locacaoAtualizada = new Object(),
                idLocacao,
				idCliente,
				nomeCliente,
				cpf,
                itens,
                dataInicio,
                dataFim;

                locacaoAtualizada.idLocacao = 2,
                locacaoAtualizada.idCliente = 2,
                locacaoAtualizada.nomeCliente = 'Rodrigo',
                locacaoAtualizada.cpf = '222.222.222-22';
                locacaoAtualizada.itens = {idItem: 2, descricaoItem: 'Painel Max Steel', valorLocacao: 10, disponibilidadeItem: true},
                locacaoAtualizada.dataInicio = '2017-10-31',
                locacaoAtualizada.dataFim = '2017-10-31';

                locacao = resultQuery;
                locacao.idLocacao = locacaoAtualizada.idLocacao,
                locacao.idCliente = locacaoAtualizada.idCliente,
                locacao.nomeCliente = locacaoAtualizada.nomeCliente,
                locacao.cpf = locacaoAtualizada.cpf,
                locacao.itens = locacaoAtualizada.itens,
                locacao.dataInicio = locacaoAtualizada.dataInicio,
                locacao.dataFim = locacaoAtualizada.dataFim;

                locacao.save(function(err, respostaBanco) {
                    if(err) {
                        var erro = new Error('Falha ao tentar atualizar a locação com o id ' + idProcurado + "!");
                        next(erro);
                    } else {
                        res.write("<h1>Locação com o id " + idProcurado + " atualizada!</h1>");
                        res.end();
                    }
                });  
            }
        });
	};
	
	this.removeByIdInDb = function(req, res, next) {
        var idProcurado = req.params.idLocacao;
        var condicoes = {"idLocacao":idProcurado};
        LocacaoModel.findOneAndRemove(condicoes, function(err, respostaBanco) {
            if(respostaBanco == null || err) {
                var erro = new Error('Falha ao tentar remover a locação com o id ' + idProcurado + "!");
                next(erro);
            } else {
                res.write("<h1>Locação com o id " + idProcurado + " removida!</h1>");
                res.end();
            }
        });
    };

    
    /*var idItens = [];
    idItens.push(1);
    idItens.push(2);
    var locacao = new Object(Locacao);
    var locacao_1 = new Locacao(1, 1, idItens, '10/10/17', '11/10/17');

    this.makeLocacao = function(newLocacao) {
        locacao.saveLocacao(newLocacao);
    };

    this.makeLocacao(locacao_1);

    this.getAll = function(req, res, next) {
        var resultadoBuscaLocacoes = locacao.findAll();
        var dadosLocacoes = new Object(),
            cliente,
            itens,
            dataInicio,
            dataFim;

        for(var i in resultadoBuscaLocacoes) {
            if(clienteController.getById(resultadoBuscaLocacoes[i].idCliente) !== undefined) {
                resultadoBuscaCliente = clienteController.getById(resultadoBuscaLocacoes[i].idCliente);
                dadosLocacoes.cliente = resultadoBuscaCliente;
            } else {
                cliente = null;
            }

            dadosLocacoes.itens = [];
            for(var j in resultadoBuscaLocacoes[i].idItens) {
                resultadoBuscaItem = itemController.getById(resultadoBuscaLocacoes[i].idItens[j]);
                if(resultadoBuscaItem !== undefined) {
                    dadosLocacoes.itens.push(resultadoBuscaItem);
                } else {
                    dadosLocacoes.itens.push(null);
                } 
            }
        }
		return res.json(dadosLocacoes);
    };

	this.getByidLocacao = function(req, res, next) {
        var resultadoBuscaLocacao = locacao.findByIdLocacao(req.params.idLocacao);
        var dadosLocacao = new Object(),
        cliente,
        itens,
        dataInicio,
        dataFim;
        
        if(clienteController.getById(resultadoBuscaLocacao.idCliente) !== undefined) {               
            resultadoBuscaCliente = clienteController.getById(resultadoBuscaLocacao.idCliente);
            dadosLocacao.cliente = resultadoBuscaCliente;
        } else {
            cliente = null;
        }
        dadosLocacao.itens = [];
        for(var i in resultadoBuscaLocacao.idItens) {
            resultadoBuscaItem = itemController.getById(resultadoBuscaLocacao.idItens[i]);
            if(resultadoBuscaItem !== undefined) {
                dadosLocacao.itens.push(resultadoBuscaItem);
            } else {
                dadosLocacao.itens.push(null);
            } 
        }
		return res.json(dadosLocacao);
	};

	this.inicial = function(req, res, next) {
		return res.render('index', {title: 'Express'});
    };*/
    
    return this;
};