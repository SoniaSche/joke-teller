
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Toggle button

function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing joke to voicerss api

function tellMe(joke) {
    VoiceRSS.speech({
        key: 'b32871d03f0446f5a3b2a364708a2eb7',
        src: joke,
        hl: 'en-us',
        v: 'John',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from jokes API

let joke = '';
async function getJokes() {
    const apiUrl = 'https://v2.jokeapi.dev/joke/Dark?blacklistFlags=nsfw,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup}... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text to speech
        tellMe(joke);
        // Disable button
        toggleButton();
    } catch (error) {
        // Catch error here
        console.log('ops', error);
    }
}

// Event listeners

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);