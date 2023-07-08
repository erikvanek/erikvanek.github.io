let counter = 0;
let speed = 2000

const blobs = [
    {
        adjective: 'critical',
        noun: 'optimist',
        color: '#800080',
        pattern: 'yolo'
    },
    {
        adjective: 'inexhaustible',
        noun: 'city biker',
        hint: 'not a biker but a commuter'
    },
    {
        adjective: 'curious',
        noun: 'cook',
        link: '/food -> page sourced from google photos'
    },
    {
        adjective: 'can do',
        noun: 'designer',
        link: '/hire-me -> page about my thoughts + tykani'
    },
    {
        adjective: 'nerdy',
        noun: 'fermenter',
        link: '/fermantation -> page sourced from google photos'
    },
    {
        adjective: 'obnoxious',
        noun: 'know-it-all'
    },
    {
        adjective: 'sensitive',
        noun: 'explorer'
    },
    {
        adjective: 'open-eyed',
        noun: 'glitch explorer',
        link: '/yagni -> page sourced from google photos'
    },
    {
        adjective: 'playful',
        noun: 'word maker',
        hint: 'I make up new words. Constantly.'
    },
    {
        adjective: 'lazy',
        noun: 'maškrtník',
        hint: 'what it is?'
    },
    {
        adjective: 'open-minded',
        noun: 'people person'
    },
    {
        adjective: 'pragmatic',
        noun: 'idealist',
        hint: 'sounds weird but I got both'
    },
]

const entries = Object.entries(blobs);
let currentTimer;
let lastStart;
let speedSpan;
let lastNoun, lastAdjective, adjective, noun;

const init = () => {
    adjective = document.getElementById('adjective')
    noun = document.getElementById('noun')
    generateContent(adjective, noun)
    currentTimer = setInterval(() => generateContent(adjective, noun), speed);
    lastStart = Date.now();
    speedSpan = document.getElementById('speed')
    speedSpan.innerText = speed;
}

const memoizeLastContent = (adjective, noun) => {
    lastNoun = noun;
    lastAdjective = adjective;
}

const generateContent = (adjective, noun) => {
    if (counter < entries.length - 1) {
        const entry = entries[counter][1];
        adjective.innerText = entry.adjective
        noun.innerText = entry.noun
        memoizeLastContent(entry.adjective)
        memoizeLastContent(entry.noun)
    } else {
        randomize()
    }
    counter++;
}

const randomizeContent = () => {
    const random = Math.floor(Math.random() * 10, 10) % entries.length;
    const random2 = Math.floor(Math.random() * 10, 10) % entries.length;
    const entry = entries[random][1]
    const entry2 = entries[random2][1]
    adjective.innerText = entry.adjective
    noun.innerText = entry2.noun
    memoizeLastContent(entry.adjective, entry2.noun)
}

document.addEventListener('DOMContentLoaded', init)

document.addEventListener('keypress', () => {
    console.log('keypress')
})

document.addEventListener('keydown', (e) => {
    const { key } = e;
    if (key === 'ArrowDown') {
        slowDown()
    } else if (key === 'ArrowUp') {
        speedUp()
    }
})

// could be smarter to resume current loop but easier it is to just 'hard' restart when speed changed
const restartLoop = () => {
    // const now = Date.now()
    // const difference = (now - lastStart) % speed;
    // const remaining = speed - difference;
    // console.log(difference)
    // console.log(remaining)
    // setTimeout(() => {

    // }, remaining);
    clearInterval(currentTimer);
    currentTimer = setInterval(() => generateContent(adjective, noun), speed);
}

const slowDown = () => {
    speed = Math.floor(speed * 1.05);
    speedSpan.innerText = speed;
    restartLoop();
}

const speedUp = () => {
    speed = Math.floor(speed / 1.05);
    speedSpan.innerText = speed;
    restartLoop();
}

const randomize = () => {
    randomizeContent()
    restartLoop()
}