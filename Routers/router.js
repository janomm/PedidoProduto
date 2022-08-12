const express = require("express");
const app = express();
const router = express.Router();
const ClienteController = require("../Control/ClienteController")
const ProdutosController = require("../Control/ProdutoController");
const PedidoController = require("../Control/PedidoController");
const PedidoProdutoController = require("../Control/PedidoProdutoController");

router.get("/",(req,res) => {
    res.render('index');
});

//Clientes
router.get("/clientes",ClienteController.Index); 
router.get("/clientes/new",ClienteController.New);
router.get("/clientes/edit/:id",ClienteController.Edit);
router.post("/clientes/update",ClienteController.Update);
router.post("/clientes/save",ClienteController.Save);
router.post("/clientes/delete",ClienteController.Delete);

//Produtos
router.get("/produtos",ProdutosController.Index); 
router.get("/produtos/new",ProdutosController.New);
router.get("/produtos/edit/:id",ProdutosController.Edit);
router.post("/produtos/update",ProdutosController.Update);
router.post("/produtos/save",ProdutosController.Save);
router.post("/produtos/delete",ProdutosController.Delete);

// Pedidos
router.get("/pedidos",PedidoController.Index);
router.get("/pedidos/new",PedidoController.New);
router.get("/pedidos/edit/:id",PedidoController.Edit);
router.post("/pedidos/save",PedidoController.Save);
router.post("/pedidos/delete",PedidoController.Delete);

//PedidoProduto
router.post("/pedidoProdutos/save",PedidoProdutoController.Save);
router.post("/pedidoProdutos/delete",PedidoProdutoController.Delete);


module.exports = router;