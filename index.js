// array
  let participantes = [
    {
        nome: "Diego Fernandes",
        email: "diego@gmail.com",
        dataInscricao: new Date(2024, 2, 1, 19, 23),
        dataCheckin: new Date(2024, 2, 1, 20, 20)
    },
    {
        nome: "Mayk Brito",
        email: "mayk@gmail.com",
        dataInscricao: new Date(2024, 1, 2, 19, 23),
        dataCheckin: null
    },
    {
        nome: "Lucas Silva",
        email: "lucas@gmail.com",
        dataInscricao: new Date(2024, 0, 3, 19, 23),
        dataCheckin: new Date(2024, 0, 4, 20, 20)
    },
    {
        nome: "Ana Souza",
        email: "ana@gmail.com",
        dataInscricao: new Date(2023, 11, 4, 19, 23),
        dataCheckin: new Date(2023, 11, 6, 20, 20)
    },
    {
        nome: "Pedro Santos",
        email: "pedro@gmail.com",
        dataInscricao: new Date(2023, 10, 5, 19, 23),
        dataCheckin: null
    },
    {
        nome: "Carla Oliveira",
        email: "carla@gmail.com",
        dataInscricao: new Date(2023, 9, 6, 19, 23),
        dataCheckin: new Date(2023, 9, 8, 20, 20)
    },
    {
        nome: "João Silva",
        email: "joao@gmail.com",
        dataInscricao: new Date(2023, 8, 7, 19, 23),
        dataCheckin: new Date(2023, 8, 9, 20, 20)
    },
    {
        nome: "Mariana Santos",
        email: "mariana@gmail.com",
        dataInscricao: new Date(2023, 7, 8, 19, 23),
        dataCheckin: new Date(2023, 7, 10, 20, 20)
    },
    {
        nome: "Paulo Souza",
        email: "paulo@gmail.com",
        dataInscricao: new Date(2023, 6, 9, 19, 23),
        dataCheckin: null
    },
    {
        nome: "Amanda Oliveira",
        email: "amanda@gmail.com",
        dataInscricao: new Date(2023, 5, 10, 19, 23),
        dataCheckin: new Date(2023, 5, 12, 20, 20)
    }
];


const CriarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  
  let dataCheckin = dayjs(Date.now()).to(participante.dataCheckin)
  
  if(participante.dataCheckin == null) {
    dataCheckin =`
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>  
        <br>
        <small>
          ${participante.email}
        </small> 
      </td>   
      <td> ${dataInscricao} </td>
      <td> ${dataCheckin} </td>
    </tr>     
    `
}

const atualizarLista=(participante) => {
  let output = ""
  // esturutura de repetição  - loop
  for(let participante of participantes) {
  output = output + CriarNovoParticipante(participante)
  }
  
  //substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML= output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckin: null
  }

    const participanteExiste = participantes.find(
      (p) => p.email == participante.email
    )

    if(participanteExiste) {
      alert('email ja cadastrado!')
      return
    }
  
  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ''
  event.target.querySelector('[name="email"]').value = ''
}

const fazerCheckIn = (event) => {
  
 const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
 if(confirm(mensagemConfirmacao) == false) {
  return
 }
   const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email 
  })


  participante.dataCheckin = new Date()

  atualizarLista(participantes)
}