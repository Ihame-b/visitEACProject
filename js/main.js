// Preloader (if the #preloader div exists)
window.addEventListener('load', function () {
    if (document.querySelector('#preloader')) {
        setInterval(() => {
            document.querySelector('#preloader').style.display = 'none';
        }, 1000);
    }
});
window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        // document.querySelector("scrolled").style.display='block'
        document.querySelector('#scrolled').classList.add('scrolled')
    } else {
        // document.querySelector("scrolled").style.display='none'
        document.querySelector('#scrolled').classList.remove('scrolled')
    }

});