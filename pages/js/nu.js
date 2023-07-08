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
        hint: 'not a biker but a commuter',
        color: '#f77446',
    },
    {
        adjective: 'curious',
        noun: 'cook',
        link: '/food -> page sourced from google photos',
        color: '#12c1dd'
    },
    {
        adjective: 'can do',
        noun: 'designer',
        link: '/hire-me -> page about my thoughts + tykani',
        color: '#158f49'
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
        noun: 'observer'
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
let speedSpan, changeCounter = 0;
let lastNoun, lastAdjective, adjective, noun, body;
let running = true;
let remainsAfterPause;

const init = () => {
    adjective = document.getElementById('adjective')
    noun = document.getElementById('noun')
    body = document.getElementsByTagName('body')[0]
    generateContent()
    currentTimer = setInterval(() => generateContent(), speed);
    lastStart = Date.now();
    speedSpan = document.getElementById('speed')
    speedSpan.innerText = speed;
}

const memoizeLastContent = (adjective, noun) => {
    lastNoun = noun;
    lastAdjective = adjective;
}

const generateContent = () => {
    if (counter < entries.length - 1) {
        const entry = entries[counter][1];
        changeContent(entry.noun, entry.adjective, entry.color)
    } else {
        randomize()
    }
    counter++;
}

const changeContent = (newNoun, newAdjective, color) => {
    adjective.innerText = newAdjective
    noun.innerText = newNoun
    memoizeLastContent(newAdjective, newNoun)
    const indexOfAdjective = Object.values(blobs).map(blob => blob.adjective).indexOf(newAdjective)
    console.log(indexOfAdjective)
    const randomValue = Math.round(Math.random() * 255 % 255).toString(16)
    // body.style.backgroundColor = color ?? `#${randomValue}${randomValue}${randomValue}`;
    const pattern = document.getElementById('pattern')
    body.style.color = Number.parseInt(randomValue, 16) % 2 === 1 ? `var(--color-1)` : `var(--color-2)`;
    changeCounter++;
    setTimeout(() => document.getElementsByClassName('active')[0]?.classList.toggle('active'), speed * 1.5)
    document.getElementById(`pattern-${indexOfAdjective + 1}`).classList.toggle('active')
    // pattern.style.backgroundImage = `var(--pattern-${changeCounter % 8})`;
    document.getElementById('changeCounter').innerText = changeCounter;
}

const randomizeContent = () => {
    const random = Math.floor(Math.random() * 10, 10) % entries.length;
    const random2 = Math.floor(Math.random() * 10, 10) % entries.length;
    const entry = entries[random][1]
    const entry2 = entries[random2][1]
    changeContent(entry2.noun, entry.adjective, entry.color)
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
    clearInterval(currentTimer);
    currentTimer = setInterval(() => generateContent(), speed);
    lastStart = Date.now();
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

// not sure about this
const togglePause = () => {
    const now = Date.now()
    if (running) {
        remainsAfterPause = (now - lastStart) % speed;
        clearInterval(currentTimer)
    } else {
        currentTimer = setTimeout(() => {
            generateContent();
            restartLoop()
        }, remainsAfterPause)
    }
    running = !running;
}