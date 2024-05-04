  // Objeto JavaScript --> {} diretamente 
  // const participante = {
  // nome: "Diego Fernandes", 
  // email: "diego@gmail.com",
  // dataInscricao: new Date(2024, 2, 22, 19, 20),
  // dataCheckIn: new Date(2024, 2, 25, 22, 00)
  // array
let participantes = [
    {
      nome: "Diego Fernandes",
      email: "diego@gmail.com",
      dataInscricao: new Date(2024, 2, 22, 19, 23),
      dataCheckIn: new Date(2024, 2, 25, 22, 20)
    },
    {
      nome: "Maky Brito",
      email: "Mayk@gmail.com",
      dataInscricao: new Date(2024, 2, 22, 19, 20),
      dataCheckIn: new Date(2024, 2, 25, 22, 10)
    },
    {
      nome: "Fulano de Tal",
      email: "fulano@gmail.com",
      dataInscricao: new Date(2024, 3, 1, 10, 30),
      dataCheckIn: new Date(2024, 3, 4, 15, 45)
    },
    {
      nome: "Ciclano Silva",
      email: "ciclano@gmail.com",
      dataInscricao: new Date(2024, 3, 5, 14, 10),
      dataCheckIn: new Date(2024, 3, 8, 9, 20)
    },
    {
      nome: "Beltrano Souza",
      email: "beltrano@gmail.com",
      dataInscricao: new Date(2024, 3, 10, 20, 0),
      dataCheckIn: null
    },
    {
      nome: "Maria Lima",
      email: "maria@gmail.com",
      dataInscricao: new Date(2024, 3, 15, 12, 40),
      dataCheckIn: new Date(2024, 3, 18, 10, 15)
    },
    {
      nome: "João Santos",
      email: "joao@gmail.com",
      dataInscricao: new Date(2024, 3, 20, 17, 55),
      dataCheckIn: new Date(2024, 3, 23, 19, 5)
    },
    {
      nome: "Ana Oliveira",
      email: "ana@gmail.com",
      dataInscricao: new Date(2024, 3, 25, 8, 20),
      dataCheckIn: null
    },
    {
      nome: "Pedro Sousa",
      email: "pedro@gmail.com",
      dataInscricao: new Date(2024, 3, 29, 16, 10),
      dataCheckIn: new Date(2024, 4, 1, 21, 30)
    },
    {
      nome: "Carla Costa",
      email: "carla@gmail.com",
      dataInscricao: new Date(2024, 4, 2, 9, 45),
      dataCheckIn: null
    }
];

const criarNovoParticipante = (participante) => {
 const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

 let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

 //condicional
 if(participante.dataCheckIn == null) {
  dataCheckIn = `
    <button
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
    >
      confirmar check-in
    </button>
  `
 }

 return `
  <tr>
    <td>
      <strong> ${participante.nome} </strong>
      <br>
      <small> ${participante.email} </small>
    </td>
    <td> ${dataInscricao} </td>
    <td> ${dataCheckIn} </td>
  </tr>
  `
}
  
const atualizarLista = (participantes) => {
  let output = ""
 // Estrutura de Repetição - loop
  for(let participante of participantes) {
 // faça alguma coisa
      output = output + criarNovoParticipante(participante)
    }
 // Substituir Informação do HTML
    document.querySelector('tbody').innerHTML = output
    
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get("nome"),
    email: dadosDoFormulario.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se participante já existe

  const participanteExiste = participantes.find((p) => {
    return p.email == participante.email}
  )

  if(participanteExiste) {
    alert("Email já cadastrado")
    return
  }
 
  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""



}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer fazer o Check-ink
  const mensagemConfirmacao = "Tem certeza que deseja fazer o check-in?"
  
  if(confirm(mensagemConfirmacao) == false) { 
    return
  }
  // encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()
  // atualizar a lista de participantes
  atualizarLista(participantes)
}



  

