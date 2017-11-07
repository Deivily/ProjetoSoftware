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
                var erro = new Error('Erro ao salvar o item no banco de dados!');
                erro.status = 500;
                next(erro);
            } else {
                var objectId = item._id;
                res.json({"_id": objectId});
            }
        });
    };

    this.getAllInDb = function(req, res, next) {
        var condicoes = {};
        var projecao = {sort:{descricaoItem: 1}};
        ItemModel.find(condicoes, null, projecao, function(err, resultQuery){
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
        var condicoes = {"idItem":req.params.idItem};
        ItemModel.findOne(condicoes, function(err, resultQuery){
            if(resultQuery == null) {
                res.json(resultQuery);
                res.end();
            } else if(err != undefined) {
                var erro = new Error('Falha na busca do item com o id ' + req.params.idItem + ' no banco de dados!');
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

    this.getByNameInDb = function(req, res, next) {
        var nomeProcurado = new RegExp('^' + req.params.nomeItem + '.*', 'i');
        var condicoes = {"descricaoItem": {$regex: nomeProcurado}};
        var projecao = {sort:{descricaoItem: 1}};
        ItemModel.find(condicoes, null, projecao, function(err, resultQuery){
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
        var condicoes = {"idItem":idProcurado};
        var jsonItem = req.body;
        ItemModel.findOne(condicoes, function(err, resultQuery) {
            if(resultQuery == null) {
                res.json(resultQuery);
            } else {
                /*var itemAtualizado = new Object(),
                idItem,
                descricaoItem,
                valorLocacao,
                disponibilidadeItem;
                itemAtualizado.idItem = 3;
                itemAtualizado.descricaoItem = 'Painel Max Steel';
                itemAtualizado.valorLocacao = 20;
                itemAtualizado.disponibilidadeItem = true;*/

                var item = resultQuery;
                item.idItem = jsonItem.idItem;
                item.descricaoItem = jsonItem.descricaoItem;
                item.valorLocacao = jsonItem.valorLocacao;
                item.disponibilidadeItem = jsonItem.disponibilidadeItem;
                item.save(function(err, itemAtualizado) {
                    if(err) {
                        var erro = new Error('Falha ao tentar atualizar o item com o id ' + idProcurado + "!");
                        next(erro);
                    } else {
                        res.json(itemAtualizado);
                    }
                });  
            }
        });
    };

    this.removeByIdInDb = function(req, res, next) {
        var idProcurado = req.params.idItem;
        var condicoes = {"idItem":idProcurado};
        ItemModel.findOneAndRemove(condicoes, function(err, resultQuery) {
            if(resultQuery == null) {
                var erro = new Error('Falha ao tentar remover o item com o id ' + idProcurado + "!");
                next(erro);
            } else {
                res.write("<h1>Item com o id " + idProcurado + " removido!</h1>");
                res.end();
            }
        });
    };
    return this;
};