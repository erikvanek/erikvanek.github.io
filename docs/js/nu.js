const blobs = [
    {
        adjective: 'critical',
        noun: 'optimist',
        color: '#800080',
        pattern: 'yolo',
    },
    {
        adjective: 'curious',
        noun: 'cook',
        link: '/food -> page sourced from google photos',
        color: '#12c1dd',
    },

    {
        adjective: 'can do',
        noun: 'designer',
        link: '/hire-me -> page about my thoughts + tykani',
        color: '#158f49',
    },
    {
        adjective: 'inexhaustible',
        noun: 'city biker',
        hint: 'not a biker but a commuter',
        color: '#f77446',
    },

    {
        adjective: 'nerdy',
        noun: 'fermenter',
        // nebo link to tag 'fermentation' na blogu
        link: '/fermantation -> page sourced from google photos',
    },
    {
        adjective: 'obnoxious',
        noun: 'know-it-all',
    },
    {
        adjective: 'sensitive',
        noun: 'observer',
    },
    {
        adjective: 'open-eyed',
        noun: 'glitch explorer',
        link: '/yagni -> page sourced from google photos',
    },
    {
        adjective: 'playful',
        noun: 'word maker',
        hint: 'I make up new words. Constantly.',
    },
    {
        adjective: 'lazy',
        noun: 'maškrtník',
        hint: 'what it is?',
    },
    {
        adjective: 'open-minded',
        noun: 'people person',
    },
    {
        adjective: 'pragmatic',
        noun: 'idealist',
        hint: 'sounds weird but I got both',
    },
    {
        adjective: 'sometimes just',
        noun: 'pure hater',
    },
];

let counter = 0;
let speed = 7000;

const entries = Object.entries(blobs);
let currentTimer;
let lastStart;
let speedSpan,
    changeCounter = 0;
let lastNoun, lastAdjective, adjective, noun, body;
let running = true;
let remainsAfterPause;

const init = () => {
    adjective = document.getElementById('adjective');
    noun = document.getElementById('noun');
    body = document.getElementsByTagName('body')[0];
    // this seems like a kind of random timeout but helps preventing jumping the animation
    setTimeout(() => {
        document.getElementById('adjective').style.animation =
            'fade-in-fade-out 7s infinite';
        document.getElementById('noun').style.animation =
            'fade-in-fade-out 7s infinite';
        generateContent();
        currentTimer = setInterval(() => generateContent(), speed);
        lastStart = Date.now();
        speedSpan = document.getElementById('speed');
        speedSpan.innerText = speed;
    }, 100);
};

const memoizeLastContent = (adjective, noun) => {
    lastNoun = noun;
    lastAdjective = adjective;
};

const generateContent = () => {
    if (counter < entries.length - 1) {
        const entry = entries[counter][1];
        changeContent(entry.noun, entry.adjective, entry.color);
    } else {
        randomize();
    }
    counter++;
};

const changeContent = (newNoun, newAdjective, color) => {
    adjective.innerText = newAdjective;
    noun.innerText = newNoun;
    memoizeLastContent(newAdjective, newNoun);
    const availableBackgroundsLength = [
        ...document.querySelectorAll('.pattern'),
    ].length;
    indexOfAdjective = Object.values(blobs)
        .map((blob) => blob.adjective)
        .indexOf(newAdjective);
    // todo make better
    if (indexOfAdjective >= availableBackgroundsLength) {
        indexOfAdjective = indexOfAdjective % availableBackgroundsLength;
    }
    console.log(indexOfAdjective);
    const randomValue = Math.round((Math.random() * 255) % 255).toString(16);
    body.style.color =
        Number.parseInt(randomValue, 16) % 2 === 1
            ? `var(--color-primary)`
            : `var(--color-secondary)`;
    changeCounter++;
    const activePattern = document.getElementsByClassName('active')[0];
    activePattern?.classList.toggle('active');
    document
        .querySelectorAll('.pattern')
    [indexOfAdjective].classList.toggle('active');
    // document
    //     .getElementById(`pattern-${indexOfAdjective + 1}`)
    //     .classList.toggle('active');
    document.getElementById('changeCounter').innerText = changeCounter;
};

const randomizeContent = () => {
    const random = Math.floor(Math.random() * 10, 10) % entries.length;
    const random2 = Math.floor(Math.random() * 10, 10) % entries.length;
    const entry = entries[random][1];
    const entry2 = entries[random2][1];
    changeContent(entry2.noun, entry.adjective, entry.color);
};

document.addEventListener('DOMContentLoaded', init);

document.addEventListener('keypress', () => {
    console.log('keypress');
});

document.addEventListener('keydown', (e) => {
    const { key } = e;
    if (key === 'ArrowDown') {
        slowDown();
    } else if (key === 'ArrowUp') {
        speedUp();
    }
});

// could be smarter to resume current loop but easier it is to just 'hard' restart when speed changed
const restartLoop = () => {
    clearInterval(currentTimer);
    currentTimer = setInterval(() => generateContent(), speed);
    lastStart = Date.now();
};

// const slowDown = () => {
//     speed = Math.floor(speed * 1.05);
//     speedSpan.innerText = speed;
//     [...document.getElementsByClassName('pattern')].forEach(pattern => pattern.style.transitionDuration = `${speed / 8}ms`)
//     restartLoop();
// }

// const speedUp = () => {
//     speed = Math.floor(speed / 1.05);
//     speedSpan.innerText = speed;
//     restartLoop();
//     [...document.getElementsByClassName('pattern')].forEach(pattern => pattern.style.transitionDuration = `${speed / 8}ms`)
// }

const randomize = () => {
    randomizeContent();
    restartLoop();
};

// not sure about this
// const togglePause = () => {
//     const now = Date.now()
//     if (running) {
//         remainsAfterPause = (now - lastStart) % speed;
//         clearInterval(currentTimer)
//     } else {
//         currentTimer = setTimeout(() => {
//             generateContent();
//             restartLoop()
//         }, remainsAfterPause)
//     }
//     running = !running;
// }
