function Locacao(idLocacao, idCliente, idItens, dataInicio, dataFim) {
    this.idLocacao = idLocacao;
    this.idCliente = idCliente;
    this.idItens = idItens;
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
        for(var i in repLocacoes) {
            if(repLocacoes[i].idLocacao == idLocacao) {
                return repLocacoes[i];
            }
        }
    };
    
    this.findByIdCliente = function(idCliente) {
        for(var i in repLocacoes) {
            if(repLocacoes[i].idCliente == idCliente) {
                return repLocacoes[i];
            }
        }
    };
};

module.exports = Locacao;