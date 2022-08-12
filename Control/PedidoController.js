const Pedido = require("../Model/Pedido");
const Cliente = require("../Model/Cliente");
const PedidoProduto = require("../Model/PedidoProduto");
const PedidoFactory = require("../Factory/PedidoFactory");


class PedidoController{
    async Index(req,res){
        try{
            // var ped = await Pedido.FindAll();
            // var pedidos = [];
            // ped.forEach(p => {
            //     pedidos.push(PedidoFactory.Build(p));
            // });
            var pedidos = await Pedido.FindAll();

            res.render('Pedidos',{pedidos});
        } catch(e){
            console.log(e);
            res.redirect("/");
        }
    }

    async New(req,res){
        try{
            var clientes = await Cliente.FindAll(); // Passa lista de Clientes para serem selecionados
            res.render("PedidosNew",{clientes});
        }
        catch(e){
            console.log(e);
            res.redirect('/pedidos');
        }
    }

    async Save(req,res){
        var data = DataAtual();
        console.log(data);
        // var data = new Date();
        var id_cliente = req.body.cliente;

        try{
            await Pedido.Create(data,id_cliente);
            res.redirect("/pedidos");
        } catch(e){
            console.log(e);
            res.redirect("/");
        }
    }

    async Edit(req,res){
        var id = req.params.id;
        try{
            var pedido = await Pedido.FindById(id);
            var pedidoProdutos = await PedidoProduto.FindProdutos(id);
            var produtos = await PedidoProduto.ListaOutrosProdutos(id);
            var dados = {
                pedido: pedido,
                pedidoProdutos: pedidoProdutos,
                produtos: produtos
            }
            res.render('PedidosEdit',{dados});

        } catch(e){
            console.log(e);
            res.redirect("/");
        }
    }

    async Delete(req,res){
        var id = req.body.id;
        try{
            // await PedidoProduto.DeleteAll(id);
            await Pedido.Delete(id);
            res.redirect("/pedidos");
        } catch(e){
            console.log(e);
            res.redirect("/");
        }
    }
}

function DataAtual(){

    var data = new Date();
    var dia = String(data.getDate()).padStart(2,"0");
    var mes = String(data.getMonth() + 1).padStart(2,"0");
    var ano = String(data.getFullYear());
    var dataAtual = `${ano}/${mes}/${dia}`;
    return dataAtual;
}

function ConverteData(data){
    var dataFull = data.substring(0,10).split("-");
    var result = dataFull[2] + "/" + dataFull[1] + "/" + dataFull[0];
    return result;
}

module.exports = new PedidoController;