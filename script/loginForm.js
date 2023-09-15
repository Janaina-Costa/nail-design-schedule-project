import {setStorage, USER_EMAIL, USER_PASSWORD} from './storagemodel.js'
import emailValidate from './utils/emailValidate.js'

const email = document.querySelector('#email')
const password = document.querySelector('#password')
const confirmationMessage = document.querySelector('.confirmation')
const btn = document.querySelector('.btn-login')
const errorMail = document.querySelector('.error-mail')
const errorPass = document.querySelector('.error-pass')


const emailValidation = () => {
  email.addEventListener('blur', ()=>{ 
    const isValidEmail = emailValidate(email.value)
        
    if(email.value.length > 0 && !isValidEmail){
      errorMail.style.display='block'
      errorMail.textContent = 'Email inválido'
    }else{
      errorMail.style.display='none'
    }
    if (email.value.length > 0 && isValidEmail === true) {
      setStorage('user_mail', e.target.value)
      errorMail.style.display='none'
    }else{
      errorMail.style.display='block'
    }
  })
}
emailValidation()

const passwordValidation = ()=>{
  password.addEventListener('blur', (e) => {
    if(password.value.length === 0){
      errorPass.style.display = 'block'

    }else if (password.value.length > 0 && password.value.length <8 ) {
      errorPass.style.display = 'block'
      errorPass.textContent = 'A senha deve conter no mínimo 8 caracteres'
    }else{
      
      errorPass.style.display = 'none'

    }    
  })
}
passwordValidation()

const submitForm = () => {
  btn.addEventListener('click', (e) => {
    e.preventDefault()
   
    
    if( email.value === USER_EMAIL && password.value === USER_PASSWORD ){
      confirmationMessage.style.display = 'flex'
      setStorage('isLogged', 'true')
      setTimeout(()=>{
        if(document.referrer == 'http://127.0.0.1:5500/scheduling.html'){
          window.location.href = 'http://127.0.0.1:5500/scheduling.html'
        }else{
          window.location.href = '/'

        }
      },800)
      
    }else if(email.value !== USER_EMAIL || password.value !== USER_PASSWORD) {
      confirmationMessage.style.display='flex'
      confirmationMessage.style.color= 'red'
      confirmationMessage.textContent = 'Email ou senha inválidos'
    }
  })
}
submitForm()

const toggleShowPassword = ()=>{
  const showPass = document.querySelector('.eye')
showPass.addEventListener('click', (e) => {
  const hidePassword = e.target.classList.contains('ph-eye-slash')
  e.target.classList.toggle('ph-eye-slash')
  if (hidePassword) {
    password.setAttribute('type', 'password')
  } else {
    password.setAttribute('type', 'text')
  }
})
}

toggleShowPassword()