    function Item(idItem, descricaoItem, valorLocacao, disponibilidadeItem) {
        this.idItem = idItem;
        this.descricaoItem = descricaoItem;
        this.valorLocacao = valorLocacao;
        this.disponibilidadeItem = disponibilidadeItem;
        var repItens = [];

        this.salvarItem = function(item) {
            repItens.push(item);
        };

        this.findAll = function() {
            return repItens;
        };
    
        this.findByName = function(name) {
            for(var item in repItens) {
                if(repItens[item].nome.toLowerCase() === name.toLowerCase()) {
                    return repItens[item];
                }
            }
        };
    };

    module.exports = Item;