document.addEventListener('DOMContentLoaded', (event) => {
    const path = window.location.pathname.replaceAll('/', '');
    const children = document.querySelectorAll('nav > ul > li');
    console.log(path);
    if (path === '') {
        children[0].classList.add('nav-active');
    } else if (path === 'profile') {
        children[1].classList.add('nav-active');
    } else if (path === 'blog') {
        children[2].classList.add('nav-active');
    }
});
