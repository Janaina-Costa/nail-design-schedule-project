
const regex = /^\w+@\w+?\.[a-zA-Z]{2,3}$/

const email = document.querySelector('#email')
const password = document.querySelector('#password')
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