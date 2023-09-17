import { server } from './server.js'
const form = document.querySelector('#form')
const input = document.querySelector('#url')
const content = document.querySelector('#content')

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  content.classList.add('placeholder')

  const videoURL = input.value

  if (!videoURL.includes('shorts')) {
    content.textContent = 'Esse vídeo não parece ser um short.'
  }

  const [_, params] = videoURL.split('/shorts/')
  const [videoID] = params.split('?si')

  content.textContent = 'Obtendo o texto do áudio...'

  const transcription = await server.get('/summary/' + videoID)

  content.textContent = 'Realizando o resumo...'

  // const summary = await server.post('/summary', {
  //   text: transcription.data.result,
  // })

  // deixei transcription no lugar de summary
  // por que achei que estava muito curto o resumo
  // mudança feita na próxima linha
  content.textContent = transcription.data.result
  content.classList.remove('placeholder')
})
