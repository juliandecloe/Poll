const darkmodeBtn = document.querySelector('header button');
const darkmodeSVG = document.querySelectorAll('header button svg');

let localDarkMode = localStorage.getItem('Dark Mode');

if(localDarkMode === 'on') {
    document.body.classList.add('darkmode');
    darkmodeSVG.forEach(svg => svg.classList.toggle('hide'));
}

function darkMode() {
    darkmodeSVG.forEach(svg => svg.classList.toggle('hide'));
    document.body.classList.toggle('darkmode');
    if(localDarkMode === 'on') {
        localDarkMode = 'off';
    } else {
        localDarkMode = 'on';
    }
    console.log(localDarkMode)
    localStorage.setItem('Dark Mode', localDarkMode);
}

darkmodeBtn.addEventListener('click', darkMode);

const scrollBtn = document.querySelector('body > button');

function scrollingTop() {
    scrollBtn.classList.add('to-top')
    window.scrollTo(0, 0);
    setTimeout(function() { scrollBtn.classList.remove('to-top') }, 2000);
}

scrollBtn.addEventListener('click', function() {
    scrollingTop();
});

window.addEventListener('scroll', () => {
    if(window.location.pathname === "/") {
        if (window.scrollY < 50) {
            scrollBtn.classList.remove('show');
        } else {
            scrollBtn.classList.add('show'); 
        }
    } 
});