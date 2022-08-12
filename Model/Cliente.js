const knex = require("../Database/connection");

class Cliente{
    async Create(nome,cep,logradouro,bairro,cidade,uf,ibge){
        try{
            await knex.insert({nome,cep,logradouro,bairro,cidade,uf,ibge}).table('cliente');
            return true;

        } catch(e){
            console.log(e);
            return false;
        }
    }

    async FindById(id){
        try{
            var cliente = await knex.select().table("cliente").where({id:id});
            return cliente[0];
        } catch(e){
            console.log(e);
            return undefined;
        }
    }
    
    async FindAll(){
        try{
            var result =
                await knex.select(['id','nome','cep','logradouro','bairro','cidade','uf','ibge']).table('cliente');
            return result;
        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async Delete(id){
        var cliente = await this.FindById(id);
        if(cliente != undefined){
            try{
                await  knex.delete().table('cliente').where({id:id});
                return true;
            } catch(e){
                console.log(e);
                return false;
            }
        }
        return false;
    }

    async Update(id,nome,cep,logradouro,bairro,cidade,uf,ibge){
        var cliente = this.FindById(id);
        if(nome.trim().length == 0){
            return false;
        }
        var editCliente = {nome,cep,logradouro,bairro,cidade,uf,ibge};
        if (cliente != undefined){
            try{
                await knex.update(editCliente).table('cliente').where({id:id});
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

module.exports = new Cliente;