//1:09 BANCO DE DADOS
//1:10 LINGUAGUEM SQL Strutured Query Language
//1:11 POSTGRES sistema gerenciador de dados relacional (SGBDR)
//1:12 instalar o POSTGRES SQL.ORG  não instalar a opção no fim
//1:14:50 instalar POSTBIRD
//1:15:30 configurar o banco de dados no postbird
// CONECTAR AO BANCO DE DADOS POSTBIRD
// npm install pg 1:23min


//configurando o servidor
const express = require("express")
const server = express()

//configurar o servidor para apresentar arquivos estaticos
server.use(express.static('public'))

//1:01 habilitar o body do formulário no server.js
server.use(express.urlencoded({extended: true}))

//configurando a template engine 44min
const nunjucks = require("nunjucks")
nunjucks.configure("./",{
    express: server,
    noCache: true // validação booleana 54min
})

// lista de doadores -  Vetor ou Array
const donors= [ //45min  organizando os dados em uma array
    {
        name: "Felipe",
        blood: "AB+"
    },
    {
        name: "João",
        blood: "A-"
    },
    {
        name: "Marcos",
        blood: "B+"
    },
    {
        name: "Roberto",
        blood: "O+"
    }

]


//configurar a apresentação na página
server.get("/", function(req, res){
    return res.render("index.html")
    
})

server.post("/", function(req, res){ 
    //57min função para pegar os dados do formulário do front
    //pegando os dados do front com o req
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    //colocando valores dentro do array 1:05min
    donors.push({
        name: name,
        blood: blood,
    })
    return res.redirect("/") //redirecionando para a pagina 1:06
} )

//npm init -y  1° vai iniciar a aplicação da pasta - package.jason
//npm install express 2°framework para criar servidor no node
// criou node_modeles e add dependencia no .jason
// 3° criar novo arquivo server.js
// node server.js no terminal para rodar o server.js
// npm install nodemon 4° inicia e finaliza o server automatico
// no arquivo package.jason alterar o script "start" "nodemon server.js"
//npm install nunjucks template ou modelos


//ligar o servidor e permitir acesso na porta 3000
server.listen(3000, function(){
    console.log("iniciei o servidor.")
})