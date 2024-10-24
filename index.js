const express = require("express")
const cors = require("cors")
const mongoose = require ('mongoose')
const app = express()
app.use(express.json())
app.use(cors())

const Filme = mongoose.model ("Filme", mongoose.Schema({
  titulo: {type: String},
  sinopse: {type: String}
  }))  

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
