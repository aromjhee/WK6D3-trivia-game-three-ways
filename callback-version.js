
export function getClue(callback) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', event => {
        if (xhr.readyState !== XMLHttpRequest.DONE) return
        if (xhr.status !== 200) getClue(xhr.status)
    
        const data = JSON.parse(xhr.responseText);
        // console.log(data);
        callback(null, data);
    });
    
    xhr.open('GET', 'https://jservice.xyz/api/random-clue');
    xhr.send();
}