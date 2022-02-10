const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const nextButtonElement = document.getElementById('next-btn')
const timerSecElement = document.getElementById('timer-sec')
const timerMinElement = document.getElementById('timer-min')
const completedMessageElement = document.getElementById('completedMessage')
const completedElement = document.getElementById('completed')

let timerStarted = false
let length = 0
let wordCount = 0
let seconds = 0
let minutes = 0

nextButtonElement.addEventListener('click',()=>{
    completedElement.classList.add('hide')
    completedElement.classList.remove('show')
    
    renderNewQuote()
})

quoteInputElement.addEventListener('input', () => {
    if(!timerStarted){
        startTimer()
        timerStarted = true
    }
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')

    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })

    if (correct){ 
        stopTimer()
        timerSecElement.innerText = 0
        timerMinElement.innerText = 0
        completedMessageElement.innerHTML = `<p> You have typed ${length} characters or ${wordCount} words in <h3>${minutes} min : ${seconds} sec<h3></p>`
        completedElement.classList.add('show')
        completedElement.classList.remove('hide')
        // renderNewQuote()
        timerStarted = false
    }
})



function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = ''
    wordCount = quote.split(' ').length
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
        length++;
    })
    quoteInputElement.value = null
}

let startTime
let timer
function startTimer() {
    startTime = new Date()
    timer = setInterval(() => {
        console.log(Math.floor(((new Date() - startTime) % (1000 * 60 * 60)) / (1000 * 60)))
        seconds = Math.floor(((new Date() - startTime) % (1000 * 60)) / 1000);
        minutes = Math.floor(((new Date() - startTime) % (1000 * 60 * 60)) / (1000 * 60));
        timerSecElement.innerText = seconds
        timerMinElement.innerText = minutes
    }, 1000)
}

function stopTimer(){
    clearInterval(timer);
}


renderNewQuote()