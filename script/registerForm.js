
const completeName = document.querySelector('#name')
const email = document.querySelector('#email')
const phone = document.querySelector('#phone')
const password = document.querySelector('#password')
const confirmPassword = document.querySelector('#password-confirm')
const confirmationMessage = document.querySelector('.confirmation')

const errorName = document.querySelector('.error-name')
const btn = document.querySelector('.btn-register')
const errorMail = document.querySelector('.error-mail')
const errorPass = document.querySelector('.error-pass')
const errorPassConfirm = document.querySelector('.error-pass-confirm')
const errorPhone = document.querySelector('.error-phone')

const validateName = () => {
  completeName.value.length <= 0 ? errorName.style.display = 'block' : errorName.style.display = 'none' 
}
const validateEmail = () => {
  email.value.length <= 0 ? errorMail.style.display = 'block' : errorMail.style.display = 'none'
}

const validatePhone = () => {
  phone.value.length <= 0 ? errorPhone.style.display = 'block' : errorPhone.style.display = 'none'
}

const validatePassword = () => {
  password.value.length <= 0 ? errorPass.style.display = 'block' : errorPass.style.display = 'none'
}

const validatePassConfirm = () => {
  confirmPassword.value.length <= 0 ? errorPassConfirm.style.display = 'block' : errorPassConfirm.style.display = 'none'
}

const getDataUserField = ()=>{
  completeName.addEventListener('blur', (e)=>{ 
    localStorage.setItem('user_name', e.target.value)
  })

  email.addEventListener('blur', (e)=>{
    localStorage.setItem('user_password', e.target.value)
  })
}
getDataUserField()


const submitForm = () => {
  btn.addEventListener('click', (e) => {
    e.preventDefault()

    validateName()
    validateEmail()
    validatePhone()
    validatePassword()
    validatePassConfirm()

  
    if(completeName.value.length > 0 && email.value.length > 0 && phone.value.length > 0 && password.value.length > 0 && confirmPassword.value.length > 0  ){
      console.log('art');
      confirmationMessage.style.display = 'flex'
      
    }

  })
}
submitForm()