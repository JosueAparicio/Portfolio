// navigation menu
(() => {

    const hamburguerBtn = document.querySelector('.hamburguer-btn'),
        navMenu = document.querySelector('.nav-menu'),
        closeNavBtn = navMenu.querySelector('.close-nav-menu');

    hamburguerBtn.addEventListener('click', showNavMenu);
    closeNavBtn.addEventListener('click', hideNavMenu);

    function showNavMenu() {
        navMenu.classList.add('open');
        bodyScrollingToggle();
    }

    function hideNavMenu() {
        navMenu.classList.remove('open');
        fadeOutEffect();
        bodyScrollingToggle();
    }

    function fadeOutEffect() {
        document.querySelector('.fade-out-effect').classList.add('active');
        setTimeout(() => {
            document.querySelector('.fade-out-effect').classList.remove('active');

        }, 300)
    }

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('link-item')) {
            if (event.target.hash !== '') {
                event.preventDefault();
                const hash = event.target.hash;
                document.querySelector('.section.active').classList.add('hide');
                document.querySelector('.section.active').classList.remove('active');

                document.querySelector(hash).classList.add('active');
                document.querySelector(hash).classList.remove('hide');

                navMenu.querySelector('.active').classList.add('outer-shadow', 'hover-in-shadow');
                navMenu.querySelector('.active').classList.remove('active', 'inner-shadow');

                if (navMenu.classList.contains('open')) {
                    event.target.classList.add('active', 'inner-shadow');
                    event.target.classList.remove('outer-shadow', 'hover-in-shadow');

                    hideNavMenu();
                } else {
                    let navItems = navMenu.querySelectorAll('.link-item');
                    navItems.forEach((item) => {
                        if (hash === item.hash) {
                            item.classList.add('active', 'inner-shadow');
                            item.classList.remove('outer-shadow', 'hover-in-shadow');
                        }
                    })
                    fadeOutEffect();
                }
                //add hash (#)
                window.location.hash = hash;

            }
        }
    })

})();


/* about sections tabs */
(() => {

    const aboutSection = document.querySelector('.about-section');
    tabsContainer = document.querySelector('.about-tabs');

    tabsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('tab-item') && !event.target.classList.contains('active')) {
            const target = event.target.getAttribute('data-target');

            tabsContainer.querySelector('.active').classList.remove('outer-shadow', 'active');
            event.target.classList.add('active', 'outer-shadow');

            aboutSection.querySelector('.tab-content.active').classList.remove('active');
            aboutSection.querySelector(target).classList.add('active');
        }
    })
})();

function bodyScrollingToggle() {
    document.body.classList.toggle('stop-scrolling').st;
}
/*--------------------
portfolio filter & popup

-----------------*/

(() => {

    const filterContainer = document.querySelector('.portfolio-filter'),
        portfolioItemsContainer = document.querySelector('.portfolio-items'),
        portfolioItems = document.querySelectorAll('.portfolio-item'),
        popup = document.querySelector('.portfolio-popup'),
        popupCert = document.querySelector('.cert-popup'),
        prevBtn = popup.querySelector('.pp-prev'),
        nextBtn = popup.querySelector('.pp-next'),
        closeBtn = popup.querySelector('.pp-close'),
        closeCertBtn = popupCert.querySelector('.pp-close-cert'),
        projectDetailsContainer = popup.querySelector('.pp-details'),
        projectDetailsBtn = popup.querySelector('.pp-project-details-btn'),
        certificates = document.querySelectorAll('.certificate');
    let itemIndex, alideIndex, screenShots;

    //Filter portfolio items
    filterContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('filter-item') && !event.target.classList.contains('active')) {
            filterContainer.querySelector('.active').classList.remove('outer-shadow', 'active');
            event.target.classList.add('active', 'outer-shadow');

            const target = event.target.getAttribute('data-target');
            portfolioItems.forEach((item) => {
                if (target === item.getAttribute('data-category') || target === 'all') {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                    item.classList.add('hide');
                }

            });
        } else {

        }
    });


    portfolioItemsContainer.addEventListener('click', (event) => {
        if (event.target.closest('.portfolio-item-inner')) {
            const portfolioItem = event.target.closest('.portfolio-item-inner').parentElement;

            //get the index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenShots = portfolioItems[itemIndex].querySelector('.portfolio-item-img img').getAttribute('data-screenshots');
            //converter screenShots in array
            screenShots = screenShots.split(',');
            if (screenShots.length === 1) {
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
            } else {
                prevBtn.style.display = 'block';
                nextBtn.style.display = 'block';
            }
            slideIndex = 0;
            popupTogle();
            popupSlideshow();
            popupDetails();
        }
    });

    closeBtn.addEventListener('click', () => {
        popupTogle();
        if (projectDetailsContainer.classList.contains('active')) {
            popupDetailsToggle();
        }
    })

    function popupTogle() {
        popup.classList.toggle('open');
        bodyScrollingToggle();
    }
    closeCertBtn.addEventListener('click', () => {
        popupTogleCert();
    })

    function popupTogleCert() {
        popupCert.classList.toggle('open');
        bodyScrollingToggle();
    }




    function popupSlideshow() {
        const imgSrc = screenShots[slideIndex];
        const popupImg = popup.querySelector('.pp-img');
        //activate loader until the popupImg loaded
        popup.querySelector('.pp-loader').classList.add('active');
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            popup.querySelector('.pp-loader').classList.remove('active');
        }

        popup.querySelector('.pp-counter').innerHTML = (slideIndex + 1) + ' of ' + screenShots.length;
    }

    certificates.forEach((item) => {
        item.addEventListener('click', (event) => {
            console.log(event.target.getAttribute('data-screenshots'));
            let img = popupCert.querySelector('.img-cert');
            img.src = event.target.getAttribute('data-screenshots');
            popupTogleCert();
        })
    })

    //next slide img
    nextBtn.addEventListener('click', () => {
        if (slideIndex === screenShots.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        popupSlideshow();
    })

    //prev slide img
    prevBtn.addEventListener('click', () => {
        if (slideIndex === 0) {
            slideIndex = screenShots.length - 1;
        } else {
            slideIndex--;
        }
        popupSlideshow();
    })

    function popupDetails() {
        //get the project details
        if (!portfolioItems[itemIndex].querySelector('.portfolio-item-details')) {
            projectDetailsBtn.style.display = 'none';
            return;
        }
        projectDetailsBtn.style.display = 'block';
        const details = portfolioItems[itemIndex].querySelector('.portfolio-item-details').innerHTML;
        popup.querySelector('.pp-project-details').innerHTML = details;
        const title = portfolioItems[itemIndex].querySelector('.portfolio-item-title').innerHTML;
        popup.querySelector('.pp-title h2').innerHTML = title;
        const category = portfolioItems[itemIndex].getAttribute('data-category');
        popup.querySelector('.pp-project-category').innerHTML = category.split('-').join(' ');


    }

    projectDetailsBtn.addEventListener('click', () => {
        popupDetailsToggle();
    })

    function popupDetailsToggle() {
        if (projectDetailsContainer.classList.contains('active')) {
            projectDetailsBtn.querySelector('i').classList.remove('fa-minus');
            projectDetailsBtn.querySelector('i').classList.add('fa-plus');
            projectDetailsContainer.classList.remove('active');
            projectDetailsContainer.style.maxHeight = 0 + 'px';
        } else {
            projectDetailsBtn.querySelector('i').classList.remove('fa-plus');
            projectDetailsBtn.querySelector('i').classList.add('fa-minus');
            projectDetailsContainer.classList.add('active');
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + 'px';
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
        }
    }

})();


/**----------------------
 *  TESTIMONIAL SECTION SLIDER
 * -----------------
 */

(() => {

    const sliderContainer = document.querySelector('.testi-slider-container'),
        slides = sliderContainer.querySelectorAll('.testi-item'),
        sliderWidth = sliderContainer.offsetWidth,
        prevBtn = document.querySelector('.testi-slider-nav .prev'),
        nextBtn = document.querySelector('.testi-slider-nav .next'),
        activeSlide = sliderContainer.querySelector('.testi-item.active');
    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);


    slides.forEach((slide) => {
        slide.style.width = sliderWidth + 'px';
    })
    sliderContainer.style.width = sliderWidth * slides.length + 'px';

    nextBtn.addEventListener('click', () => {
        if (slideIndex === slides.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        slider();
    })

    prevBtn.addEventListener('click', () => {
        if (slideIndex === 0) {
            slideIndex = slides.length - 1;
        } else {
            slideIndex--;
        }
        slider();
    })

    function slider() {
        sliderContainer.querySelector('.testi-item.active').classList.remove('active');
        slides[slideIndex].classList.add('active');
        sliderContainer.style.marginLeft = -(sliderWidth * slideIndex) + 'px';
    }

    slider();

})();

(() => {

    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
        if (!section.classList.contains('active')) {
            section.classList.add('hide')
        }
    })

})();

window.addEventListener('load', () => {
    document.querySelector('.preloader').classList.add('fade-out');
    setTimeout(() => {
        document.querySelector('.preloader').style.display = 'none';
    }, 600)
})

function certPopup() {
    popupCert();
}

function sendEmail(e) {
    e.preventDefault();

    const name = document.getElementById('txt-name'),
        email = document.getElementById('txt-email'),
        message = document.getElementById('txt-message'),
        asunto = document.getElementById('txt-asunt');

    if (name.value === '' || email.value === '' || message.value === '' || asunto.value === '') {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Fill in all the fields',
            showConfirmButton: false,
            timer: 1500
        })

    }else{


        var send = {
            userSupport: 'Josue Aparicio',
            emailSupport: 'josue9aparicio@gmail.com',
            nameContact: name.value,
            lastContact: ' ',
            emailContact: email.value,
            message: message.value,
            phoneContact: ' '
        }
        console.log(send);
        let timerInterval
        Swal.fire({
          title: 'Sending!',
          html: 'Please wait',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
              const content = Swal.getHtmlContainer()
              if (content) {
                const b = content.querySelector('b')
                if (b) {
                  b.textContent = Swal.getTimerLeft()
                }
              }
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
          fetch('https://backend-hiperefe.herokuapp.com/supportEmail', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(send), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Ups, Try Again Later',
                showConfirmButton: false,
                timer: 1500
            })
        })
        .then(response => {
            name.value = '';
            email.value = '';
            message.value = '';
            asunto.value = '';
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            console.log('Success:', response)
        });
        })
    }

}