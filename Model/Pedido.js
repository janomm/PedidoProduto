const knex = require('../Database/connection');
const PedidoFactory = require("../Factory/PedidoFactory");

class Pedido{
    async Create(emissao,id_cliente){
        try{
            await knex.insert({emissao,id_cliente}).table('pedido');
            return true;            
        } catch(e){
            console.log(e);
            return false;
        }
    }

    async FindById(id){
        try{
            var pedido = await knex.select(['pedido.*','cliente.nome'])
                .table("pedido")
                .innerJoin("cliente","cliente.id","pedido.id_cliente")
                .where('pedido.id',id);
            return pedido[0];
        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async FindAll(){
        try{
            var pedidos = await knex.select(['pedido.*','cliente.nome'])
                .table('pedido')
                .innerJoin("cliente","cliente.id","pedido.id_cliente");
            // var pedidos = [];
            // // console.log("-->" + pedidos[0]);
            // ped.forEach(p => {
            //     pedidos.push(PedidoFactory.Build(p));
            // });
            return pedidos;
        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async Delete(id){
        var pedido = await this.FindById(id);
        if(pedido != undefined){
            try{
                await knex.delete().table('pedido').where({id:id});
                return true;
            } catch(e){
                console.log(e);
                return false;
            }
        }
        return false;
    }

    // async Update(id,emissao,id_cliente){
    //     var pedido = this.FindById(id);
    //     var editPedido = {emissao,id_cliente};
    //     if (pedido != undefined){
    //         try{
    //             await knex.update(editPedido).table('pedido').where({id:id});
    //             return true;
    //         }
    //         catch(e){
    //             console.log(e);
    //             return false;
    //         }
    //     }
    //     return false;
    // }

}

module.exports = new Pedido;