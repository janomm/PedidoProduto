const knex = require("../Database/connection");

class PedidoProduto{
    async Create(id_pedido,id_produto,quantidade){
        try{
            await knex.insert({id_pedido,id_produto,quantidade}).table('pedidoproduto');
            return true;
        } catch(e){
            console.log(e);
            return false;
        }
    }

    async FindProdutos(id_pedido){
        try{
            var pedidoProdutos = await knex.select(["produto.*"]).table("pedidoproduto")
                .innerJoin("produto","produto.id","pedidoproduto.id_produto")
                .where("pedidoproduto.id_pedido",id_pedido);
            return pedidoProdutos;
        } catch(e){
            console.log(e);
            return false;
        }
    }

    async ListaOutrosProdutos(id_pedido){
        try{
            var outrosProdutos = await knex.select().table('produto')
                .whereNotExists(
                    knex.select().from('pedidoproduto')
                        .whereRaw('pedidoproduto.id_produto = produto.id and pedidoproduto.id_pedido = ' + id_pedido)
                );
            
            return outrosProdutos;

        } catch(e){
            console.log(e);
            return false;
        }
    }

    async FindById(id_pedido,id_produto){
        try{
            var pedidoProduto = await knex.select().table("pedidoproduto")
                .whereRaw(`pedidoproduto.id_pedido = ${id_pedido} and pedidoproduto.id_produto = ${id_produto}`);
            return pedidoProduto;
        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async Delete(id_pedido,id_produto){
        try{
            await knex.delete().table('pedidoproduto')
                .whereRaw("pedidoproduto.id_pedido = " + id_pedido + " and pedidoproduto.id_produto = " + id_produto);
            return true;
        } catch(e){
            console.log(e);
            return false;
        }
    }

    // async DeleteAll(id_pedido){
    //     try{
    //         await knex.delete().table('pedidoproduto').where("pedidoproduto.id_pedido",id_pedido);
    //         return true;
    //     } catch(e){
    //         console.log(e);
    //         return false;
    //     }
    // }

}

module.exports = new PedidoProduto;