class PedidoFactory{
    Build(pedido){
        var id_pedido = pedido.id_pedido;
        var emissao = this.Converte(pedido.emissao.toString());
        var id_cliente = pedido.id_cliente;
        var nome = pedido.nome;

        var ped = {
            id_pedido,
            emissao,
            id_cliente,
            nome
        }

        return ped;
    }

    Converte(p){
        var dataFull = p.substring(0,10).split("-");
        var result = dataFull[2] + "/" + dataFull[1] + "/" + dataFull[0];
        return result;
    }

}

module.exports = new PedidoFactory;