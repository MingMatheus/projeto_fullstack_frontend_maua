const express = require("express")
const cors = require("cors")
const mongoose = require ('mongoose')
const uniqueValidator = require("mongoose-unique-validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const app = express()
app.use(express.json())
app.use(cors())

const Filme = mongoose.model ("Filme", mongoose.Schema({
  titulo: {type: String},
  sinopse: {type: String}
  }))  

const usuarioSchema = mongoose.Schema({
  login: {type: String, required: true, unique: true},
  password: {type: String, required: true}
})

usuarioSchema.plugin(uniqueValidator)

const Usuario = mongoose.model("Usuario", usuarioSchema)

async function conectarAoMongoDB() {
  await
  mongoose.connect(`mongodb+srv://admin7:root7@meu-cluster.s0iu0.mongodb.net/?retryWrites=true&w=majority&appName=meu-cluster`)
  }

app.get("/filmes", async (req, res) => {
  const filmes = await Filme.find()
  res.json(filmes)
})  

app.post("/filmes", async (req, res) => {
  //obtém os dados enviados pelo cliente
  const titulo = req.body.titulo
  const sinopse = req.body.sinopse

  //monta um objeto agrupando os dados. Ele representa um novo filme
  //a seguir, construímos um objeto Filme a partir do modelo do mongoose
  const filme = new Filme({titulo: titulo, sinopse: sinopse})

  //save salva o novo filme na base gerenciada pelo MongoDB
  await filme.save()
  const filmes = await Filme.find()
  res.json(filmes)
})  

app.post("/signup", async (req, res) => {
  try
  {
    const login = req.body.login
    const password = req.body.password
    const criptografada = await bcrypt.hash(password, 10)
  
    const usuario = new Usuario({login: login, password: criptografada})
  
    const resMongo = await usuario.save()
    console.log(resMongo)
  
    res.status(201).end()
  }
  catch(e)
  {
    console.log(e)
    res.status(409).end()
  }
})

app.post("/login", async (req, res) => {
  const login = req.body.login
  const password = req.body.password

  const usuarioExiste = await Usuario.findOne({login: login})

  if(!usuarioExiste)
  {
    return res.status(401).json({mensagem: "login invalido"})
  }
  else
  {
    const senhaCorreta = await bcrypt.compare(password, usuarioExiste.password)

    if(!senhaCorreta)
    {
      return res.status(401).json({mensagem: "senha invalida"})
    }
    
    const token = jwt.sign(
      {login: login},
      "chave-secreta",
      {expiresIn: "1h"}
    )

    res.status(200).json({token: token})
  }
})

app.listen(3000, () => {
  try
  {
    conectarAoMongoDB()
    console.log("up and running")
  }
  catch (e)
  {
    console.log('Erro', e)
  }
})
