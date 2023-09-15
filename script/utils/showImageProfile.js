import { USER_IMAGE } from "../storagemodel.js"

const profileImage = document.querySelector('#profile-image')


const showImageProfile = (userLogged)=>{
  if(userLogged){
   return profileImage.src = USER_IMAGE
  }else{
   return profileImage.src = './assets/profile.png'
  }
}
export default showImageProfile()