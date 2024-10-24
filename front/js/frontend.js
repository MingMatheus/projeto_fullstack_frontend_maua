const protocolo = "http://"
const baseURL = "localhost:3000"
const filmesEndPoint = "/filmes"

async function obterFilmes()
{
  const URLcompleta = `${protocolo}${baseURL}${filmesEndPoint}`
  const filmes = (await axios.get(URLcompleta)).data

  let tabela = document.querySelector(".filmes")
  let corpoTabela = tabela.getElementsByTagName("tbody")[0]
  for (let filme of filmes)
  {
    let linha = corpoTabela.insertRow(0)
    let celulaTitulo = linha.insertCell(0)
    let celulaSinopse = linha.insertCell(1)
    celulaTitulo.innerHTML = filme.titulo
    celulaSinopse.innerHTML = filme.sinopse
  }
}

async function cadastrarFilme()    // Devo fazer até a página 43 (finalizar a seção 2.19)
{
  //constrói a URL completa
  const URLCompleta = `${protocolo}${baseURL}${filmesEndPoint}`

  //pega os inputs que contém os valores que o usuário digitou
  let tituloInput = document.querySelector('#tituloInput')
  let sinopseInput = document.querySelector('#sinopseInput')

  //pega os valores digitados pelo usuário
  let titulo = tituloInput.value
  let sinopse = sinopseInput.value

  // somente adiciona se o usuário tiver digitado os dois valores
  if (titulo && sinopse)
  {
    //limpa os campos que o usuário digitou
    tituloInput.value = ""
    sinopseInput.value = ""
  
    //envia os dados ao servidor (back end)
    const filmes = (await axios.post(URLCompleta, {titulo, sinopse})).data
  
    //limpa a tabela para preenchê-la com a coleção nova, atualizada
    let tabela = document.querySelector('.filmes')
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]
    corpoTabela.innerHTML = ""
    for (let filme of filmes)
    {
      let linha = corpoTabela.insertRow(0)
      let celulaTitulo = linha.insertCell(0)
      let celulaSinopse = linha.insertCell(1)
      celulaTitulo.innerHTML = filme.titulo
      celulaSinopse.innerHTML = filme.sinopse
    }
  }

  //senão, exibe o alerta por até 2 segundos
  else
  {
    let alert = document.querySelector('.alert')
    alert.classList.add('show')
    alert.classList.remove('d-none')
    setTimeout(() => {
      alert.classList.remove('show')
      alert.classList.add('d-none')
      }, 2000)      
  }
}
