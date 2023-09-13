import {setStorage} from './storagemodel.js'

const completeName = document.querySelector('#name')
const email = document.querySelector('#email')
const phone = document.querySelector('#phone')
const password = document.querySelector('#password')
const cep = document.querySelector('#cep')
const address = document.querySelector('#address')
const neighborhood = document.querySelector('#neighborhood')
const confirmationMessage = document.querySelector('.confirmation')

const errorName = document.querySelector('.error-name')
const btn = document.querySelector('.btn-register')
const errorMail = document.querySelector('.error-mail')
const errorPass = document.querySelector('.error-pass')
const errorCep = document.querySelector('.error-cep')
const errorAddress = document.querySelector('.error-address')
const errorNeighborhood = document.querySelector('.error-neighborhood')
const errorPhone = document.querySelector('.error-phone')

const setDisplayElement = (element, child)=>{
 return element.value.length <= 0 ? child.style.display = 'block' : child.style.display = 'none' 
}

const validateName = () => {
  setDisplayElement(completeName, errorName)
}
const validateEmail = () => {
  setDisplayElement(email, errorMail)
  
}

const validatePhone = () => {
  setDisplayElement(phone, errorPhone)
}

const validatePassword = () => {
  setDisplayElement(password, errorPass)
}

const validateCep = ()=>{
  setDisplayElement(cep, errorCep)
}

const validateAddress = () => {
  setDisplayElement(address, errorAddress)
}

const validateNeighborhood = () => {
  setDisplayElement(neighborhood, errorNeighborhood)
}

const getDataUserField = ()=>{
  completeName.addEventListener('blur', (e)=>{ 
    setStorage('user_name', e.target.value)
  })
  email.addEventListener('blur', (e)=>{
    setStorage('user_mail', e.target.value)
  })

  password.addEventListener('blur', (e)=>{
    setStorage('user_password', e.target.value)
  })

  cep.addEventListener('blur', (e)=>{
    setStorage('user_cep', e.target.value)
  })

  neighborhood.addEventListener('blur', (e)=>{
    setStorage('user_neighborhood', e.target.value)
  })

  address.addEventListener('blur', (e)=>{
    setStorage('user_address', e.target.value)
  })

  phone.addEventListener('user_phone', (e)=>{
    setStorage('user_phone', e.target.value)
  })
}
const phoneMask = (value)=>{
  if(!value){
    return ''
  }
  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{2})(\d)/,"($1) $2")
  value = value.replace(/(\d)(\d{4})$/,"$1-$2")
  return value
}

const handlePhone = ()=>{
  phone.addEventListener('keyup',(e)=>{
    let value = e.target.value
    value = phoneMask(value)
    phone.value = value
   
  })
}
handlePhone()
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
    validateCep()

  
    if(completeName.value.length > 0 && email.value.length > 0 && phone.value.length > 0 && password.value.length > 0 &&  address.value.length > 0 && neighborhood.value.length > 0 && cep.value.length >0 ){
      
      confirmationMessage.style.display = 'flex'
      window.location.assign('./login.html')
      
    }

  })
}
submitForm()



