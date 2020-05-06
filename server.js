//configurar o servidor
const express = require("express")
const server = express()

//configurar servidor para apresentar arquivos estaticos css
server.use(express.static('public'))

//1:01 habilitar o body do formulário no server.js
server.use(express.urlencoded({extended: true}))

//configurar a conexão com p DB
const Pool =  require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: '887971',
    host: 'localhost',
    port: 5432,
    database: 'doe'

})

//configurando a template
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true
})




//configurar a apresentacao da pagina
server.get("/", function(req, res){
   
    db.query("SELECT * FROM donors", function(err, result){
        if (err) return res.send("Erro de banco de dados")

        const donors = result.rows
        return res.render("index.html", { donors })
    })
   
})

server.post("/", function(req, res){ 
    //57min função para pegar os dados do formulário do front
    //pegando os dados do front com o req
    const name = req.body.name // ctrl C
    const email = req.body.email //ctrl V dois click no nome ctrl D
    const blood = req.body.blood

    //condicoes do formulario
    if (name == "" || email== "" || blood ==""){
        return res.send("Todos os campos sao obrigatorios.")
    }

    //colocando valores dentro do DB
    const query = `
    INSERT INTO donors("name","email","blood") 
    VALUES ($1, $2, $3)`
    
    const values = [name, email, blood]

    db.query(query,values, function(err) {

        if (err) return res.send("erro no banco de dados.")
        
        return res.redirect("/") //redirecionando para a pagina 1:06
    })
    
} )

// npm install pg conecxão com o banco de dados

//ligar o servidor 
server.listen(3000, function(){
    console.log("Servidor iniciado")
})