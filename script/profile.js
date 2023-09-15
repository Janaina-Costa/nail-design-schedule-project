import { DATE_SCHEDULE, removeStorageItem, TIME_SCHEDULE, USER_LOGGED, USER_NAME, USER_NEIGHBORHOOD } from "./storagemodel.js"

const date = document.querySelector('.current-schedule')
const dateRow = document.querySelector('.current-schedule-date')

const logout = document.querySelector('.logout')


  if(Boolean(!DATE_SCHEDULE)){
  date.style.display = 'none'
   
  }else{
     dateRow.textContent = `${DATE_SCHEDULE } | ${TIME_SCHEDULE} `
   
  }

const showUserLoggedData = ()=>{
   const profileNameLogged = document.querySelector('.profile-name')
   const profileNeighborhoodLogged = document.querySelector('.profile_neighborhood')

   profileNameLogged.innerHTML = USER_NAME || ''
   profileNeighborhoodLogged.innerHTML = USER_NEIGHBORHOOD || ''

}

showUserLoggedData()

const handleLogout = ()=>{
   logout.addEventListener('click', ()=>{
     removeStorageItem('isLogged')
     location.assign('/')
   })
 }
 handleLogout()