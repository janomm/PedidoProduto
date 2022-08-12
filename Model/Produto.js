const knex = require("../Database/connection");

class Produto {

    async Create(descricao,peso_liquido,peso_unitario){
        try{
            await knex.insert({descricao,peso_liquido,peso_unitario}).table('produto');
            return true;

        } catch(e){
            console.log(e);
            return false;
        }
    }

    async FindById(id){
        try{
            var produto = await knex.select().table("produto").where({id:id});
            return produto[0];
        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async FindAll(){
        try{
            var produtos = await knex.select().table('produto');
            return produtos;
        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async Delete(id){
        var produto = await this.FindById(id);
        if(produto != undefined){
            try{
                await  knex.delete().table('produto').where({id:id});
                return true;
            } catch(e){
                console.log(e);
                return false;
            }
        }
        return false;
    }

    async Update(id,descricao,peso_liquido,peso_unitario){
        var produto = this.FindById(id);
        if(descricao.trim().length == 0){
            return false;
        }
        var editProduto = {descricao,peso_liquido,peso_unitario};
        if (produto != undefined){
            try{
                await knex.update(editProduto).table('produto').where({id:id});
                return true;
            }
            catch(e){
                console.log(e);
                return false;
            }
        }
        return false;
    }

}

module.exports = new Produto;