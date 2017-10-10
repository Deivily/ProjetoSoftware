function Locacao(idLocacao, idCliente, listaItens, dataInicio, dataFim) {
    this.idLocacao = idLocacao;
    this.idCliente = idCliente;
    this.listaItens = listaItens;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
    var repLocacoes = [];

    this.saveLocacao = function(locacao) {
        repLocacoes.push(locacao);
    };

    this.findAll = function() {
        return repLocacoes;
    };

    this.findByIdLocacao = function(idLocacao) {
        for(var locacao in repLocacoes) {
            if(repLocacoes[locacao].idLocacao === idLocacao) {
                return repLocacoes[locacao];
            }
        }
    };
    
    this.findByIdCliente = function(idCliente) {
        for(var locacao in repLocacoes) {
            if(repLocacoes[locacao].idCliente === idCliente) {
                return repLocacoes[locacao];
            }
        }
    };
};

module.exports = Locacao;