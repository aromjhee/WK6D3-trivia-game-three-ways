import { getClue as getClueFromCallBack } from './callback-version.js'
import { getClue as getClueFromPromise } from './promise-version.js'

const callbackButton = document.getElementById('use-callback');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const value = document.getElementById('value');
const categoryTitle = document.getElementById('category-title');
const invalidCount = document.getElementById('invalid-count');
const usePromiseButton = document.getElementById('use-promise');

callbackButton.addEventListener('click', event => {
    getClueFromCallBack((error, clueObj) => {
        if (error !== null) console.error(error);
        getInnerHTML(clueObj);

    })
})

usePromiseButton.addEventListener('click', event => {
    getClueFromPromise()
        .then(getInnerHTML)
        .catch(reason => console.log(reason))
})

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