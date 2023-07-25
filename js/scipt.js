document.addEventListener('DOMContentLoaded', () => {
    
    // Tab

    const tabsContent = document.querySelectorAll('.tabcontent'),
          tabs = document.querySelectorAll('.tabheader__item'),
          tabsParent = document.querySelector('.tabheader')

    function hideTab(){
        tabsContent.forEach(item => {
            item.classList.add('hide')
            item.classList.remove('show', 'fade')
        })

        tabs.forEach((item)=>{
            item.classList.remove('tabheader__item_active')
        })

    }

    function showTab(i = 0){
        
        tabsContent[i].classList.add('show', 'fade')
        tabsContent[i].classList.remove('hide')
        tabs[i].classList.add('tabheader__item_active')
    
    }

    hideTab()
    showTab()

    tabsParent.addEventListener('click', (event)=>{
        const target = event.target
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if(target == item){
                    hideTab()
                    showTab(i)
                } 
            })
        }
    })

    // Date

    const deadline = '2023-10-02'

    function getTimeParametrs(endtime){
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if(t<=0){
            days = 0
            hours = 0
            minutes = 0
            seconds = 0
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60 );
        }
              
            
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }


    function setZero(num){
        if(num >= 0 && num < 10) return `0${num}`;
        else return num;
    }

    function setTimeParametrs(selector, endtime){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock()      
        function updateClock(){
            const timeParametrs = getTimeParametrs(endtime);
            
            days.innerHTML = setZero(timeParametrs.days)
            hours.innerHTML = setZero(timeParametrs.hours)
            minutes.innerHTML = setZero(timeParametrs.minutes)
            seconds.innerHTML = setZero(timeParametrs.seconds)

            if(timeParametrs.total <= 0) clearInterval(timeInterval)
        }
        
    }

    setTimeParametrs('.timer', deadline)

    // Modal

    const callUsBtns = document.querySelectorAll('[data-modal]'),
          closeModalBtn = document.querySelector('[data-close]'),
          modalWindow = document.querySelector('.modal')


    function hideModal(){
        modalWindow.classList.add('hide')
        modalWindow.classList.remove('show')
        document.body.style.overflow = ''
    }

    function showModal(){
        modalWindow.classList.add('show')
        modalWindow.classList.remove('hide')
        document.body.style.overflow = 'hidden'
    }

    callUsBtns.forEach(item => {
        item.addEventListener('click', ()=>{
            showModal()
            clearInterval(timeToShowModal)   
        })
    })

    

    closeModalBtn.addEventListener('click', ()=>{
        hideModal()
    })

    modalWindow.addEventListener('click', (e) => {
        if(e.target === modalWindow){
            hideModal()
        }
    })

    document.addEventListener('keydown', (e)=>{
        if(e.code == 'Escape') {
            hideModal()
        }
    })

    function showBottomModal(){
        if(document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            showModal()
            clearInterval(timeToShowModal)
            document.removeEventListener('scroll', showBottomModal)
        }
    }

    document.addEventListener('scroll', showBottomModal)
    
    const timeToShowModal = setTimeout(showModal, 5000)

})