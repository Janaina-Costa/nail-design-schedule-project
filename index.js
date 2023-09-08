const iconMenuMobile = document.querySelector('.menu-list-mobile')
const dropdownMenu = document.querySelector('.dropdown-menu')
const closeMenu = document.querySelector('.close-button')

iconMenuMobile.addEventListener('click',(e)=>{
  dropdownMenu.style.display= 'block'
})

closeMenu.addEventListener('click', ()=>{
  dropdownMenu.style.display = 'none'
  console.log('clique');
})