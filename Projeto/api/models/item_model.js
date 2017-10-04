    function Item(idItem, descricaoItem, valorLocacao, disponibilidadeItem) {
        this.idItem = idItem;
        this.descricaoItem = descricaoItem;
        this.valorLocacao = valorLocacao;
        this.disponibilidadeItem = disponibilidadeItem;

        this.findItem = function() {
            return 'item';
        }
    };

    module.exports = Item;