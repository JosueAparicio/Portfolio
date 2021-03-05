/* ------------------toggle  style switcher -------------------*/
const styleSwitcherToggler = document.querySelector('.style-switcher-toggler');
styleSwitcherToggler.addEventListener('click', ()=> {
    document.querySelector('.style-switcher').classList.toggle('open');
})

//hide style switcher on scroll
window.addEventListener('scroll', ()=>{
    if(document.querySelector('.style-switcher').classList.contains('open')){
        document.querySelector('.style-switcher').classList.remove('open')
    }
})

/**---------------theme colors ------------------------- */
const alternateStyle = document.querySelectorAll('.alternate-style');
function setActiveStyle(color){
    alternateStyle.forEach((theme) =>{
        if(color == theme.getAttribute('title')){
            theme.removeAttribute('disabled');
        }else{
            theme.setAttribute('disabled', 'true');

        }
    })
}

/** -------- theme light and dark mode ----------------*/
const dayNight = document.querySelector('.day-night');
dayNight.addEventListener('click', ()=>{
    dayNight.querySelector('i').classList.toggle('fa-sun');
    dayNight.querySelector('i').classList.toggle('fa-moon');
    document.body.classList.toggle('dark');
})
window.addEventListener('load', ()=>{
    if(document.body.classList.contains('dark')){
        dayNight.querySelector('i').classList.add('fa-sun');
    }else{
        dayNight.querySelector('i').classList.add('fa-moon');
    }
})


/**----------------change lang-------------------------- */
const changeLang = document.querySelector('.change-lang');
changeLang.addEventListener('click', ()=>{
    if(window.location.pathname == '/Portfolio/en/index.html'){

        window.location.pathname = '/Portfolio/index.html';

    }else{
        window.location.pathname = '/Portfolio/en/index.html';
    }

    console.log(window.location.pathname);

})