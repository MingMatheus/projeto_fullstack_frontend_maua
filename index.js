const express = require("express")
const app = express()
app.use(express.json())

// get http://localhost:3000/oi
app.get("/oi", (req, res) => {
  res.send("oi")
})

let filmes = [
  {
    titulo: "Shrek",
    sinopse: "Um ogro tem sua vida invadida por personagens de contos de fadas que acabam com a tranquilidade de seu lar. Ele faz um acordo pra resgatar uma princesa."
  },
  {
    titulo: "Os Incríveis",
    sinopse: "Depois do governo banir o uso de superpoderes, o maior herói do planeta, o Sr. Incrível, vive de forma pacata com sua família. Apesar de estar feliz com a vida doméstica, o Sr. Incrível ainda sente falta dos tempos em que viveu como super-herói, e sua grande chance de entrar em ação novamente surge quando um velho inimigo volta a atacar. Só que agora ele precisa contar com a ajuda de toda a família para vencer o vilão."
  }

]

app.get("/filmes", (req, res) => {
  res.json(filmes)
})

app.post("/filmes", (req, res) => {
  // capturar as informações enviadas
  const titulo = req.body.titulo
  const sinopse = req.body.sinopse

  // montar um objeto json filme com as informações capturadas
  const novo_filme = {titulo: titulo, sinopse: sinopse}
  
  // acrescentar o novo filme à base
  filmes.push(novo_filme)

  // para ilustrar, mostrar a base atualizada
  res.json(filmes)
})

app.listen(3000, () => console.log("server up and running"))
