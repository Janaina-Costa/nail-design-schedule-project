import { setStorage, USER_ADDRESS, USER_CEP, USER_EMAIL, USER_IMAGE, USER_NAME, USER_NEIGHBORHOOD, USER_PASSWORD, USER_PHONE } from './storagemodel.js'
import emailValidate from './utils/emailValidate.js'


const completeName = document.querySelector('#name')
const email = document.querySelector('#email')
const phone = document.querySelector('#phone')
const password = document.querySelector('#password')
const cep = document.querySelector('#cep')
const address = document.querySelector('#address')
const neighborhood = document.querySelector('#neighborhood')
const confirmationMessage = document.querySelector('.confirmation')
const btn = document.querySelector('.btn-register')
const profileImageInput = document.querySelector('#profile-image-input')
const profileImage = document.querySelector('#profile-image')

const errorMessage = document.querySelector('.error-message')
const errorName = document.querySelector('.error-name')
const errorMail = document.querySelector('.error-mail')
const errorPass = document.querySelector('.error-pass')
const errorCep = document.querySelector('.error-cep')
const errorAddress = document.querySelector('.error-address')
const errorNeighborhood = document.querySelector('.error-neighborhood')
const errorPhone = document.querySelector('.error-phone')



const setDisplayElement = (element, child) => {
  return element.value.length <= 0 ? child.style.display = 'block' : child.style.display = 'none'
}

const phoneMask = (value) => {
  if (!value) {
    return ''
  }
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d{2})(\d)/, "($1) $2")
  value = value.replace(/(\d)(\d{4})$/, "$1-$2")
  return value
}

const handlePhone = () => {
  phone.addEventListener('keyup', (e) => {
    let value = e.target.value
    value = phoneMask(value)
    phone.value = value

  })
}
handlePhone()

const zipCodeMask = (value) => {
  if (!value) return ""
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d{5})(\d)/, '$1-$2')
  return value
}

const handleZipCode = () => {
  cep.addEventListener('keyup', (e) => {
    let value = e.target.value
    value = zipCodeMask(value)
    cep.value = value

  })
}
handleZipCode()

const getZipCode = async () => {
  let zip = document.querySelector('#cep').value
  zip = zip.replace('-', '')

  const url = `https://viacep.com.br/ws/${zip}/json/`
  if (zip.length !== 8) {
    errorCep.style.display = 'block'
    errorCep.textContent = 'Cep inválido'
    cep.focus()
    return
  }
  try {
    const response = await fetch(url)
    const data = await response.json()
    if (!data) {
      return
    }

    showAddressData(data)
    console.log({ data });
    return data

  } catch (e) {
    console.log(e);
  }
}



cep.addEventListener('blur', () => {
  if (document.hasFocus()) {
    console.log(getZipCode());

  }
  setStorage('user_cep', e.target.value)

})

const showAddressData = (data) => {
  if (data.erro) {
    errorCep.style.display = 'block'
    errorCep.textContent = 'Cep inexistente'
  } else {
    errorCep.style.display = 'none'
  }

  if (data) {
    address.value = data.logradouro || ''
    neighborhood.value = data.bairro || ''
  }

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

const validateCep = () => {
  setDisplayElement(cep, errorCep)
}

const validateAddress = () => {
  setDisplayElement(address, errorAddress)
}

const validateNeighborhood = () => {
  setDisplayElement(neighborhood, errorNeighborhood)
}


function completeNameValidate(completeName) {
  const namePattern = /[A-z]{2}[ ][A-z]{2}/;
  return namePattern.test(completeName)

}

const getDataUserField = () => {
  completeName.addEventListener('blur', (e) => {
    const isValidCompleteName = completeNameValidate(completeName.value)

    if (completeName.value.length > 0 && !isValidCompleteName) {
      errorName.style.display = 'block'
      errorName.textContent = 'Favor informar nome e sobrenome'
    } else {
      errorName.style.display = 'none'
    }

    if (completeName.value.length > 0 && isValidCompleteName) {
      setStorage('user_name', e.target.value)
      errorName.style.display = 'none'
    } else {
      errorName.style.display = 'block'
    }
  })

  phone.addEventListener('blur', (e) => {
    validatePhone()
    if (phone.value.length > 0) {
      setStorage('user_phone', e.target.value)
    }
  })



  email.addEventListener('blur', (e) => {
    const isValidEmail = emailValidate(email.value)

    if (email.value.length > 0 && isValidEmail === false) {
      errorMail.style.display = 'block'
      errorMail.textContent = 'Email inválido'
    } else {
      errorMail.style.display = 'none'

    }
    if (email.value.length > 0 && isValidEmail === true) {
      setStorage('user_mail', e.target.value)
      errorMail.style.display = 'none'

    } else {

      errorMail.style.display = 'block'
    }

  })

  cep.addEventListener('blur', (e) => {
    setStorage('user_cep', e.target.value)
  })

  password.addEventListener('blur', (e) => {
    if (password.value.length === 0) {
      validatePassword()
    } else if (password.value.length > 0 && password.value.length < 8) {
      errorPass.style.display = 'block'
      errorPass.textContent = 'A senha deve conter no mínimo 8 caracteres'
    } else {
      setStorage('user_password', e.target.value)
      validatePassword()
    }
  })


  neighborhood.addEventListener('blur', (e) => {
    if (neighborhood.value.length > 0) {
      setStorage('user_neighborhood', e.target.value)
    }
    validateNeighborhood()
  })

  address.addEventListener('blur', (e) => {
    if (address.value.length > 0) {
      setStorage('user_address', e.target.value)
    }
    validateAddress()
  })
}

getDataUserField()

/***Imagem do perfil */
const getImageToProfile = () => {
  profileImageInput.addEventListener('change', (e) => {
    if (!(e.target && e.target.files && e.target.files.length > 0)) {
      return
    }
    let reader = new FileReader()
    reader.onload = function () {
      profileImage.src = reader.result
      console.log(profileImage.src);
     setStorage('img-profile', profileImage.src)
    }
    reader.readAsDataURL(e.target.files[0])

  })
}
getImageToProfile()

const persistData = ()=>{
  if((Boolean(USER_NAME)&& Boolean(USER_PHONE) && Boolean(USER_CEP) && Boolean(USER_ADDRESS) && Boolean(USER_NEIGHBORHOOD) && Boolean(USER_EMAIL) && Boolean(USER_PASSWORD) && Boolean(USER_IMAGE))){
    completeName.value = USER_NAME
    phone.value = USER_PHONE
    cep.value = USER_CEP
    address.value = USER_ADDRESS
    neighborhood.value = USER_NEIGHBORHOOD
    email.value = USER_EMAIL
    password.value = USER_PASSWORD
  }
}
persistData()

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


    if (completeName.value.length > 0 && email.value.length > 0 && phone.value.length > 0 && password.value.length > 0 && address.value.length > 0 && neighborhood.value.length > 0 && cep.value.length > 0) {

      confirmationMessage.style.display = 'flex'
      window.location.assign('./login.html')

    }

  })
}
submitForm()



