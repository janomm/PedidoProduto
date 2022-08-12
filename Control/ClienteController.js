const Cliente = require("../Model/Cliente");

class ClienteController{
    async Index(req,res){
        try{
            var clientes = await Cliente.FindAll();
            res.render('Clientes',{clientes});
        } catch(e){
            console.log(e);
            res.redirect("/");
        }
    }

    async New(req,res){
        res.render("ClientesNew");
    }

    async Save(req,res){
        var {nome,cep,bairro,logradouro,cidade,uf,ibge} = req.body;
        try{
            await Cliente.Create(nome,cep,logradouro,bairro,cidade,uf,ibge);
            res.redirect("/clientes");
        } catch(e){
            console.log(e);
            res.redirect("/");
        }
    }

    async Edit(req,res){
        var id = req.params.id;
        try{
            var cliente = await Cliente.FindById(id);
            res.render('ClientesEdit',{cliente});

        } catch(e){
            console.log(e);
            res.redirect("/");
        }
    }

    async Update(req,res){
        var {id,nome,cep,logradouro,bairro,cidade,uf,ibge} = req.body;
        try{
            await Cliente.Update(id,nome,cep,logradouro,bairro,cidade,uf,ibge);
            res.redirect("/clientes");
        } catch(e){
            console.log(e);
            res.redirect("/");
        }
    }

    async Delete(req,res){
        var id = req.body.id;

        try{
            await Cliente.Delete(id);
            var clientes = await Cliente.FindAll();
            res.render('Clientes',{clientes});
            // res.render('Clientes');
        } catch(e){
            console.log(e);
            res.redirect("/");
        }
    }

}

module.exports = new ClienteController;