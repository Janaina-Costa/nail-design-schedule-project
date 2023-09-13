import { USER_EMAIL, USER_NAME, USER_NEIGHBORHOOD, USER_PASSWORD, removeAllStorage } from "./script/storagemodel.js"

let isLogged = Boolean(USER_EMAIL) && Boolean(USER_PASSWORD)

const userName = document.querySelector('.profile-name')
const userNeighborhood  = document.querySelector('.profile_neighborhood ')
const logout = document.querySelector('.logout')


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
    userName.textContent = USER_NAME
    userNeighborhood.textContent += USER_NEIGHBORHOOD
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

const handleLogout = ()=>{
  logout.addEventListener('click', ()=>{
    removeAllStorage()
    location.reload()
  })
}
handleLogout()

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

  itemFloat.addEventListener('mouseover',()=>{itemFloat.classList.add('open-float')})
  itemFloat.addEventListener('mouseleave',()=>itemFloat.classList.add('close-float'))

  itemFloat.addEventListener('touchstart',()=>itemFloat.classList.add('open-float'))
  itemFloat.addEventListener('touchend',()=>itemFloat.classList.add('close-float'))

}
showFloatingLink()

