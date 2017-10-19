module.exports = function(app){
    var Item = require('../models/item_model.js');

    this.saveItem = function(idItem, descricaoItem, valorLocacao, disponibilidadeItem) {
        new Item({
            'idItem': idItem,
            'descricaoItem': descricaoItem,
            'valorLocacao': valorLocacao,
            'disponibilidadeItem': disponibilidadeItem
        }).save(function(err, item) {
            if(err) {
                console.log('Falha ao salvar o item no banco de dados!')
            } else {
                console.log('Item salvo no banco de dados!')
            }
        });
    };

    //this.saveItem(1, 'Painel Ben 10', 10, true);

    this.getAllInDb = function(req, res, next) {
        Item.find({}, function(err, resultQuery){
            if(err) {
                var erro = new Error('Falha na busca dos itens no banco de dados!');
                next(erro);
            } else {
                var arrayItens = [];
                var item = new Object(),
                idItem,
                descricaoItem,
                valorLocacao,
                disponibilidadeItem;
                
                for(var i in resultQuery) {
                   item.idItem = resultQuery[i].idItem;
                    item.descricaoItem = resultQuery[i].descricaoItem;
                    item.valorLocacao = resultQuery[i].valorLocacao;
                    item.disponibilidadeItem = resultQuery[i].disponibilidadeItem;
                    arrayItens.push(item);
                }

                return res.json(arrayItens);
            }
        });
    }

    this.getByIdInDb = function(req, res, next) {
        Item.find({"idItem":req.params.idItem}, function(err, resultQuery){
            console.log(resultQuery.length);
            if(resultQuery.length < 1) {
                var erro = new Error('Falha na busca do item com o id ' + req.params.idItem + ' no banco de dados!');
                next(erro);
            } else {
                var item = new Object(),
                idItem,
                descricaoItem,
                valorLocacao,
                disponibilidadeItem;

                item.idItem = resultQuery[0].idItem,
                item.descricaoItem = resultQuery[0].descricaoItem,
                item.valorLocacao = resultQuery[0].valorLocacao,
                item.disponibilidadeItem = resultQuery[0].disponibilidadeItem;
              
                return res.json(item);  
            }  
        });
    }

    
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