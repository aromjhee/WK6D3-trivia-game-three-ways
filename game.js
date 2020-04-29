import { getClue as getClueFromCallBack } from './callback-version.js'
import { getClue as getClueFromPromise } from './promise-version.js'
import { getClue as getClueFromAsyncFunction } from './async-await-version.js'

const callbackButton = document.getElementById('use-callback');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const value = document.getElementById('value');
const categoryTitle = document.getElementById('category-title');
const invalidCount = document.getElementById('invalid-count');
const usePromiseButton = document.getElementById('use-promise');
const useAsyncButton = document.getElementById('use-async-await');
const checkRespButton = document.getElementById('check-response');
const playerResponse = document.getElementById('player-response');
const score = document.getElementById('score');
let scoreValue = 0;

function getInnerHTML(clueObj) {
    question.innerHTML = `${clueObj.question}`
    answer.innerHTML = `${clueObj.answer}`
    value.innerHTML = `${clueObj.value}`
    categoryTitle.innerHTML = `${clueObj.category.title}`

    if (`${clueObj.invalid_count}` > 0) {
        invalidCount.innerHTML = 'invalid'
    } else {
        invalidCount.innerHTML = 'valid'
    }
}

function newQuestion() {
    checkRespButton.classList.remove('is-hidden');
    playerResponse.value = '';
    answer.classList.add('is-hidden');
}

callbackButton.addEventListener('click', event => {
    newQuestion()
    getClueFromCallBack((error, clueObj) => {
        if (error !== null) console.error(error);
        getInnerHTML(clueObj);

    })
})

usePromiseButton.addEventListener('click', event => {
    newQuestion()
    getClueFromPromise()
        .then(getInnerHTML)
        .catch(reason => console.log(reason))
})

useAsyncButton.addEventListener('click', async (event) => {
    newQuestion()
    try {
        const clue = await getClueFromAsyncFunction();
        console.log(clue);
        getInnerHTML(clue);
    } catch (e) {
        console.log(e.message);
    }
})

checkRespButton.addEventListener('click', event => {
    let playerAnswer = playerResponse.value.trim()
    let answerCheck = answer.innerHTML.trim()
    
    if (playerAnswer === answerCheck) {
        scoreValue += Number(value.innerHTML);
    } else {
        scoreValue -= Number(value.innerHTML);
    }
    score.innerHTML = scoreValue;
    answer.classList.remove('is-hidden');
    checkRespButton.classList.add('is-hidden');
})

