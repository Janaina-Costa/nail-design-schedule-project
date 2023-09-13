import {USER_EMAIL, USER_NAME, USER_PASSWORD} from './storagemodel.js'

const email = document.querySelector('#email')
const password = document.querySelector('#password')
const confirmationMessage = document.querySelector('.confirmation')
const btn = document.querySelector('.btn-login')
const errorMail = document.querySelector('.error-mail')
const errorPass = document.querySelector('.error-pass')


const validateEmail = () => {
  email.value.length <= 0 ? errorMail.style.display = 'block' : errorMail.style.display = 'none'
}
const validatePassword = ()=>{
  password.value.length <=0 ? errorPass.style.display = 'block' : errorPass.style.display = 'none'
}

const submitForm = () => {
  btn.addEventListener('click', (e) => {
    e.preventDefault()
    validatePassword()
    validateEmail()

    if( email.value === USER_EMAIL && password.value === USER_PASSWORD ){
      confirmationMessage.style.display = 'flex'
      setTimeout(()=>{
        window.location.assign('/')
      },800)
      
    }else if(email.value !== USER_EMAIL || password.value !== USER_PASSWORD) {
      confirmationMessage.style.display='flex'
      confirmationMessage.style.color= 'red'
      confirmationMessage.textContent = 'Email ou senha inválidos'
    }
  })
}
submitForm()

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