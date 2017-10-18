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

    this.getAll = function(req, res, next) {
        Item.find({}, function(err, itens){
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
                
                for(var i in itens) {
                   item.idItem = itens[i].idItem;
                    item.descricaoItem = itens[i].descricaoItem;
                    item.valorLocacao = itens[i].valorLocacao;
                    item.disponibilidadeItem = itens[i].disponibilidadeItem;
                    arrayItens.push(item);
                }

                return res.json(arrayItens);
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