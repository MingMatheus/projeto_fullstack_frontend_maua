const protocolo = "http://"
const baseURL = "localhost:3000"

function exibirFilmes(filmes)
{
  let tabela = document.querySelector(".filmes")
  let corpoTabela = tabela.getElementsByTagName("tbody")[0]
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

function exibeAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout)
{
  let alert = document.querySelector(seletor)
  alert.innerHTML = innerHTML
  // ... é o operador spread
  // ele é aplicado a um array para desmembrar seus elementos, isto é, uma lista
  alert.classList.add(...classesToAdd)
  alert.classList.remove(...classesToRemove)
  setTimeout(() => {
    alert.classList.remove(...classesToAdd)
    alert.classList.add(...classesToRemove)
  }, timeout)
}

async function obterFilmes()
{
  const filmesEndPoint = "/filmes"
  const URLcompleta = `${protocolo}${baseURL}${filmesEndPoint}`
  const filmes = (await axios.get(URLcompleta)).data

  exibirFilmes(filmes)
}

async function cadastrarFilme()
{
  const filmesEndPoint = "/filmes"
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
    exibirFilmes(filmes)
  }

  //senão, exibe o alerta por até 2 segundos
  else
  {
    exibeAlerta(".alert-filme", "Preencha todos os campos", ["show", "alert-danger"], ["d-none"], 2000)
  }
}

async function cadastrarUsuario()
{
  let usuarioCadastroInput = document.querySelector('#usuarioCadastroInput')
  let passwordCadastroInput = document.querySelector('#passwordCadastroInput')

  let usuarioCadastro = usuarioCadastroInput.value
  let passwordCadastro = passwordCadastroInput.value

  usuarioCadastroInput.value = ""  
  passwordCadastroInput.value = ""

  if(usuarioCadastro && passwordCadastro)
  {
    let modalCadastro = bootstrap.Modal.getInstance(document.querySelector("#modalCadastro"))

    try
    {
      const cadastroEndpoint = "/signup"
      const URLcompleta = `${protocolo}${baseURL}${cadastroEndpoint}`
      await axios.post(URLcompleta, {login: usuarioCadastro, password: passwordCadastro})

      exibeAlerta(".alert-modal-cadastro", "Usuário cadastrado com sucesso!!!", ["show", "alert-success"], ["d-none"], 2000)
      setTimeout(() => {modalCadastro.hide()}, 2000)
    }
    catch(e)
    { 
      exibeAlerta(".alert-modal-cadastro", "Não foi possível cadastrar o usuário!!!", ["show", "alert-danger"], ["d-none"], 2000)
      setTimeout(() => {modalCadastro.hide()}, 2000)
    }
  }
  else
  {
    // ativa o modal de alerta sobre preenchimento dos campos
    exibeAlerta(".alert-modal-cadastro", "Preencha todos os campos!!!", ["show", "alert-danger"], ["d-none"], 2000)
  }
}
