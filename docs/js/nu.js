const adjectives = ['critical', 'can do', 'curious', 'inexhaustible', 'nerdy', 'hard-working', 'open-minded', 'lazy', 'playful', 'pragmatic']
const nouns = ['optimist', 'designer', 'cook', 'city biker', 'glitch explorer', 'fermenter', 'people person', 'maškrtník', 'word maker', 'idealist']

const init = () => {
    let counter = 0;
    const adjective = document.getElementById('adjective')
    const noun = document.getElementById('noun')
    setInterval(() => {
        if (counter < adjectives.length - 1) {
            adjective.innerText = adjectives[counter]
            noun.innerText = nouns[counter]
        } else {
            const random = Math.floor(Math.random() * 10, 10);
            const index = random * random % 10;
            adjective.innerText = adjectives[index]
            noun.innerText = nouns[index * index % nouns.length]
        }
        counter++;
    }, 500);
}

document.addEventListener('DOMContentLoaded', init)