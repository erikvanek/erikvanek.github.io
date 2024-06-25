document.addEventListener('DOMContentLoaded', () => {
    const figures = document.querySelectorAll('figure');
    let lightbox = null;

    figures.forEach((figure) => {
        figure.addEventListener('click', openLightbox);
    });

    function openLightbox(event) {
        const figure = event.currentTarget;
        const content = figure.querySelector('img, video').cloneNode(true);
        const caption = figure.querySelector('figcaption');

        lightbox = document.createElement('div');
        lightbox.className = 'lightbox';

        const closeButton = document.createElement('button');
        closeButton.className = 'lightbox-close';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', closeLightbox);

        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'lightbox-content';
        contentWrapper.appendChild(content);

        if (caption) {
            const captionClone = caption.cloneNode(true);
            captionClone.className = 'lightbox-caption';
            contentWrapper.appendChild(captionClone);
        }

        lightbox.appendChild(closeButton);
        lightbox.appendChild(contentWrapper);
        document.body.appendChild(lightbox);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // Prevent scrolling on mobile
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.remove();
            lightbox = null;
            document.body.style.overflow = '';
        }
    }
});
