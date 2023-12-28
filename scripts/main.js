(() => {
    const loadTimeSpan = document.querySelector('.load-time');
    window.addEventListener('load', () => {
        const perfMark = performance.mark('pageEnd');
        loadTimeSpan.innerHTML += `Page loaded in ${perfMark.startTime / 1000}s`;
    });
})();


const headers = {
    index: 'Metrics',
    info: 'Info',
    permissions: 'Accounts',
};

const page = document.location.href.split('/').pop().split('.')[0];
const nav_buttons = document.querySelectorAll('.nav__button');
nav_buttons.forEach((link) => {
    if (link.innerHTML === headers[page]) {
        link.classList.add('primary_nav__button');
    }
});
