window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    //tabs
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {   
            for(let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //timer
    let deadLine = '2020-01-16'; //my b-day

    function getTimeRemaining(endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor(t/(1000*60*60));

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endTime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endTime);

            function addZero(num) {
                if(num < 10) {
                    return '0' + num;
                } else {
                    return num;
                }
            }
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if(t.total <=0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }
    setClock('timer', deadLine)

    // modal
    let more = document.querySelector('.more'),
        about = document.querySelector('#about'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    about.addEventListener('click', function(evt) {
        let target = evt.target;

        if(target && target.classList.contains('more') || target && target.classList.contains('description-btn')) {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        }
    });
    // more.addEventListener('click', function() {
    // overlay.style.display = 'block';
    // this.classList.add('more-splash');
    // document.body.style.overflow = 'hidden';
    // });

    close.addEventListener('click', function() {
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    document.body.style.overflow = '';
    });

     // Form
 let messege = {
    loading: 'Загрузка ...',
    success: 'Спасибо! Мы скоро с вами свяжемся!',
    error: 'Что-то пошло не так...'
};

let modalForm = document.querySelector('.main-form'),
    modalInput = modalForm.getElementsByTagName('input'),
    openForm = document.querySelector('#form'),
    openFormInput = openForm.getElementsByTagName('input'),
    statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    function formSubmit(form, input) {
        form.addEventListener('submit', function(event){
            event.preventDefault();
            form.appendChild(statusMessage);

            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/json');

            let formData = new FormData(form),
                obj = {};
            formData.forEach(function(value, key) {
                obj[key] = value;
            });
            let json = JSON.stringify(obj);

            request.send(json);
            request.addEventListener('readystatechange', function() {
                if(request.readyState < 4){
                    statusMessage.innerHTML = messege.loading;
                }else if(request.readyState === 4  && request.status == 200) {
                    statusMessage.innerHTML = messege.success;
                }else {
                    statusMessage.innerHTML = messege.error;
                }
            });

            for(let i=0; i<input.length; i++) {
                input[i].value = '';
            }
        });
    }

    modalForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('1');
        formSubmit(modalForm, modalInput);
        console.log('2');
    });
    openForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('11');
        formSubmit(openForm, openFormInput);
        console.log('22');
    });

//     modalForm.addEventListener('submit', function(event){
//         event.preventDefault();
//         modalForm.appendChild(statusMessage);

//         let request = new XMLHttpRequest();
//         request.open('POST', 'server.php');
//         //request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');
//         request.setRequestHeader('Content-Type', 'application/json');

//         let formData = new FormData(modalForm);

//         // change value to json format
//         let obj = {};
//         formData.forEach(function(value, key) {
//             obj[key] = value;
//         });
//         let json = JSON.stringify(obj);
//         // end

//         //request.send(formData);
//         request.send(json);

//         request.addEventListener('readystatechange', function() {
//             if(request.readyState < 4){
//                 statusMessage.innerHTML = messege.loading;
//             }else if(request.readyState === 4  && request.status == 200) {
//                 statusMessage.innerHTML = messege.success;
//             }else {
//                 statusMessage.innerHTML = messege.error;
//             }
//         });

//         for(let i=0; i<modalInput.length; i++) {
//             modalInput[i].value = '';
//         }
//     });
});