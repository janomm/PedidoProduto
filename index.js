const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./Routers/router");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//view engine
app.set("view engine","ejs");

app.use("/",router);

app.listen(8989,(req,res) => {
    console.log("Running Free...");
})
