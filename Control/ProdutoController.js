const Produto = require("../Model/Produto");

class ProdutoController{
    async Index(req,res){
        try{
            var produtos = await Produto.FindAll();
            res.render('Produtos',{produtos});
        } catch(e){
            console.log(e);
            res.redirect("/");
        }
    }

    async New(req,res){
        res.render("ProdutosNew");
    }

    async Save(req,res){
        var {descricao,peso_liquido,peso_unitario} = req.body;
        try{
            await Produto.Create(descricao,peso_liquido,peso_unitario);
            res.redirect("/produtos");
        } catch(e){
            console.log(e);
            res.redirect("/");
        }
    }

    async Edit(req,res){
        var id = req.params.id;
        try{
            var produto = await Produto.FindById(id);
            res.render('ProdutosEdit',{produto});
        } catch(e){
            console.log(e);
            res.redirect("/");
        }
    }

    async Update(req,res){
        var {id,descricao,peso_liquido,peso_unitario} = req.body;
        try{
            await Produto.Update(id,descricao,peso_liquido,peso_unitario);
            res.redirect("/produtos");
        } catch(e){
            console.log(e);
            res.redirect("/");
        }
    }

    async Delete(req,res){
        var id = req.body.id;

        try{
            await Produto.Delete(id);
            var produtos = await Produto.FindAll();
            res.render('Produtos',{produtos});
            // res.render('Clientes');
        } catch(e){
            console.log(e);
            res.redirect("/");
        }
    }
}

module.exports = new ProdutoController;