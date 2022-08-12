const PedidoProduto = require("../Model/PedidoProduto");

class PedidoProdutoController{
    async Save(req,res){
        var id_pedido = req.body.id_pedido;
        var id_produto = req.body.id_produto;

        try{
            await PedidoProduto.Create(id_pedido,id_produto,1);
            res.redirect("/pedidos/edit/" + id_pedido);
        } catch(e){
            console.log(e);
            res.redirect("/");
        }
    }

    async Delete(req,res){
        var id_pedido = req.body.id_pedido;
        var id_produto = req.body.id_produto;
        try{
            await PedidoProduto.Delete(id_pedido,id_produto);
            res.redirect("/pedidos/edit/" + id_pedido);
        } catch(e){
            console.log(e);
            res.redirect("/");
        }
    }

}

module.exports = new PedidoProdutoController;