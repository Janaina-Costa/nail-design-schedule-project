
const completeName = document.querySelector('#name')
const email = document.querySelector('#email')
const phone = document.querySelector('#phone')
const password = document.querySelector('#password')
const address = document.querySelector('#address')
const neighborhood = document.querySelector('#neighborhood')
const confirmationMessage = document.querySelector('.confirmation')

const errorName = document.querySelector('.error-name')
const btn = document.querySelector('.btn-register')
const errorMail = document.querySelector('.error-mail')
const errorPass = document.querySelector('.error-pass')
const errorAddress = document.querySelector('.error-address')
const errorNeighborhood = document.querySelector('.error-neighborhood')
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
const validateAddress = () => {
  address.value.length <= 0 ? errorAddress.style.display = 'block' : errorAddress.style.display = 'none'
}

const validateNeighborhood = () => {
  neighborhood.value.length <= 0 ? errorNeighborhood.style.display = 'block' : errorNeighborhood.style.display = 'none'
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
    validateNeighborhood()
    validateAddress()

  
    if(completeName.value.length > 0 && email.value.length > 0 && phone.value.length > 0 && password.value.length > 0 && confirmPassword.value.length > 0  ){
      console.log('art');
      confirmationMessage.style.display = 'flex'
      
    }

  })
}
submitForm()