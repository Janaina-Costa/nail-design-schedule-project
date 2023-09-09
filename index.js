let isLogged = 0

const setStyleByEvent = (component, event, child, propStyle) => {
  component.addEventListener(event, () => {
    child.style.display = propStyle
  })
}

const applicationContainer = document.querySelector('.container')

/*menu mobile */

const toggleDropdownMenu = () => {
  const iconMenuMobile = document.querySelector('.menu-list-mobile')
  const dropdownMenu = document.querySelector('.dropdown-menu')
  const closeMenu = document.querySelector('.close-button')

  setStyleByEvent(iconMenuMobile, 'click', dropdownMenu, 'block')
  setStyleByEvent(closeMenu, 'click', dropdownMenu, 'none')

}
toggleDropdownMenu()


/*menu profile */

const actionMenuProfile = () => {
  const profileMenu = document.querySelector('.menu-profile')
  const componentMenuProfile = document.querySelector('.wrapper-menu-profile')
  const closeBtn = document.querySelector('.close')

  setStyleByEvent(profileMenu, 'mouseover', componentMenuProfile, 'block')
  setStyleByEvent(closeBtn, 'click', componentMenuProfile, 'none')
  
  showContentProfileMenu()
}

const showContentProfileMenu = ()=>{
 
  const loggedUser = document.querySelector('.logged')
  const unloggedUser = document.querySelector('.unlogged')

  if(isLogged){
    loggedUser.style.display = 'block'
    unloggedUser.style.display = 'none'
  }else{
    loggedUser.style.display = 'none'
    unloggedUser.style.display = 'block'
  }
}

const redirectLogin = ()=>{
  const loginLink = document.querySelector('.logi-in')
  loginLink.addEventListener('click', ()=>{
    window.location.assign('http://127.0.0.1:5500/login.html')
  })
}
actionMenuProfile()
redirectLogin()

/**Link flutuante */
const showFloatingLink =()=>{
  const itemFloat = document.querySelector('.float')
  const linkFloat = document.querySelector('.float p')
  document.addEventListener('scroll',()=>{
    let position = window.pageYOffset
    if(position > 0){
      itemFloat.classList.add('open-float')
  
    }else{
      itemFloat.classList.add('close-float')
    }
  })
  
  linkFloat.addEventListener('click', ()=>{
    window.location.assign('http://127.0.0.1:5500/scheduling.html')
  })

}
showFloatingLink()




