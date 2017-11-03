module.exports = function(app){
    var ItemModel = require('../models/item_model.js');

    this.saveItemInDb = function(req, res, next) {
        var jsonItem = req.body;
        new ItemModel({
            'idItem': jsonItem.idItem,
            'descricaoItem': jsonItem.descricaoItem,
            'valorLocacao': jsonItem.valorLocacao,
            'disponibilidadeItem': jsonItem.disponibilidadeItem
        }).save(function(err, item) {
            if(err) {
                console.log('Falha ao salvar o item no banco de dados!');
            } else {
                console.log('Item salvo no banco de dados!');
                var objectId = item._id;
                res.json({"_id": objectId});
            }
            
        });
        
    };

    this.getAllInDb = function(req, res, next) {
        ItemModel.find({}, function(err, resultQuery){
            if(err) {
                var erro = new Error('Falha na busca dos itens no banco de dados!');
                next(erro);
            } else {
                var arrayItens = [];
                
                for(var i in resultQuery) {
                    var item = new Object(),
                    idItem,
                    descricaoItem,
                    valorLocacao,
                    disponibilidadeItem;

                    item.idItem = resultQuery[i].idItem;
                    item.descricaoItem = resultQuery[i].descricaoItem;
                    item.valorLocacao = resultQuery[i].valorLocacao;
                    item.disponibilidadeItem = resultQuery[i].disponibilidadeItem;
                    arrayItens.push(item);
                }

                return res.json(arrayItens);
            }
        });
    };

    this.getByIdInDb = function(req, res, next) {
        var criterioBusca = {"idItem":req.params.idItem};
        ItemModel.findOne(criterioBusca, function(err, resultQuery){
            if(resultQuery == null) {
                var erro = new Error('Falha na busca do item com o id ' + req.params.idItem + ' no banco de dados!');
                next(erro);
            } else {
                var item = new Object(),
                idItem,
                descricaoItem,
                valorLocacao,
                disponibilidadeItem;

                item.idItem = resultQuery.idItem,
                item.descricaoItem = resultQuery.descricaoItem,
                item.valorLocacao = resultQuery.valorLocacao,
                item.disponibilidadeItem = resultQuery.disponibilidadeItem;
              
                return res.json(item);  
            }  
        });
    };

    this.getByNameInDb = function(req, res, next) {
        var nomeProcurado = new RegExp('^' + req.params.nomeItem, 'i');
        var criterioBusca = {"descricaoItem": {$regex: nomeProcurado}};
        ItemModel.findOne(criterioBusca, function(err, resultQuery){
            if(resultQuery == null) {
                res.json(resultQuery);
                res.end();
            } else if (err){
                var erro = new Error();
                erro.status = 500;
                next(erro);
            } else {
                var item = new Object(),
                idItem,
                descricaoItem,
                valorLocacao,
                disponibilidadeItem;

                item.idItem = resultQuery.idItem,
                item.descricaoItem = resultQuery.descricaoItem,
                item.valorLocacao = resultQuery.valorLocacao,
                item.disponibilidadeItem = resultQuery.disponibilidadeItem;
              
                
                return res.json(item);  
            }  
        });
    };

    this.getByPartOfNameInDb = function(req, res, next) {
        var nomeProcurado = new RegExp('^' + req.params.nomeItem + '.*', 'i');
        var criterioBusca = {"descricaoItem": {$regex: nomeProcurado}};
        ItemModel.find(criterioBusca, function(err, resultQuery){
            if(resultQuery.length < 1) {
                var erro = new Error('Falha na busca dos itens com o nome similar a ' +'"' + req.params.nomeItem + '"' + ' no banco de dados!');
                next(erro);
            } else {
                var arrayItens = [];
                
                
                for(var i in resultQuery) {
                    var item = new Object(),
                    idItem,
                    descricaoItem,
                    valorLocacao,
                    disponibilidadeItem;
                    
                    item.idItem = resultQuery[i].idItem;
                    item.descricaoItem = resultQuery[i].descricaoItem;
                    item.valorLocacao = resultQuery[i].valorLocacao;
                    item.disponibilidadeItem = resultQuery[i].disponibilidadeItem;
                    arrayItens.push(item);
                }

                return res.json(arrayItens);  
            }  
        });
    };

    this.updateByIdInDb = function(req, res, next) {
        var idProcurado = req.params.idItem;
        var criterioAtualizacao = {"idItem":idProcurado};
        ItemModel.findOne(criterioAtualizacao, function(err, resultQuery) {
            if(resultQuery == null) {
                var erro = new Error('O item com o id ' + idProcurado + ' não foi encontrado!');
                next(erro);
            } else {
                var itemAtualizado = new Object(),
                idItem,
                descricaoItem,
                valorLocacao,
                disponibilidadeItem;
                itemAtualizado.idItem = 3;
                itemAtualizado.descricaoItem = 'Painel Max Steel';
                itemAtualizado.valorLocacao = 20;
                itemAtualizado.disponibilidadeItem = true;

                var item = resultQuery;
                item.idItem = itemAtualizado.idItem;
                item.descricaoItem = itemAtualizado.descricaoItem;
                item.valorLocacao = itemAtualizado.valorLocacao;
                item.disponibilidadeItem = itemAtualizado.disponibilidadeItem;
                item.save(function(err, itemAtualizado) {
                    if(err) {
                        var erro = new Error('Falha ao tentar atualizar o item com o id ' + idProcurado + "!");
                        next(erro);
                    } else {
                        res.write("<h1>Item com o id " + idProcurado + " atualizado!</h1>");
                        res.end();
                    }
                });  
            }
        });
    };

    this.removeByIdInDb = function(req, res, next) {
        var idProcurado = req.params.idItem;
        var criterioRemocao = {"idItem":idProcurado};
        ItemModel.findOneAndRemove(criterioRemocao, function(err, resultQuery) {
            if(resultQuery == null) {
                var erro = new Error('Falha ao tentar remover o item com o id ' + idProcurado + "!");
                next(erro);
            } else {
                res.write("<h1>Item com o id " + idProcurado + " removido!</h1>");
                res.end();
            }
        });
    };

    
    /*var novoItem = new Item(1, 'Painel Ben 10' , 'R$15', true);
    var novoItem2 = new Item(2, 'Painel Barbie' , 'R$15', true);
    var item = new Object(Item);
    item.salvarItem(novoItem);
    item.salvarItem(novoItem2);

    this.getAll = function(req, res, next) {
        var itens = item.findAll();
		return res.json(itens);
    };

	this.getByName = function(req, res, next) {
		var resultadoBusca = item.findByName(req.params.name);
		return res.json(resultadoBusca);
    };
    
    this.getById = function(idItem) {
		var resultadoBusca = item.findById(idItem);
		return resultadoBusca;
	};

	this.inicial = function(req, res, next) {
		return res.render('index', {title: 'Express'});
    };*/
    
    return this;
};