addEventListener('DOMContentLoaded', () => {
    const heading = document.getElementsByClassName('main-claim')[0];
    heading.style.display = 'block';
    let counter = 1;
    const prefixes = ['re', '', 'de'];
    heading.style.animation = 'star 5s ease-out infinite';

    setInterval(() => {
        heading.innerHTML = `Under <em>permanent</em> ${
            prefixes[counter % 3]
        }construction`;
        counter++;
    }, 5000);
});
