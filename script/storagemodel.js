const setStorage = (key, value) => {
  localStorage.setItem(key, value);
};
const getStorage = (key) => {
  return localStorage.getItem(key);
};
const removeStorageItem = (key) => {
  localStorage.removeItem(key);
};
const removeAllStorage = () => {
  localStorage.clear();
};

const TECHNIQUE_NAME = getStorage("service");
const ENAMELING_GEL = getStorage('enameling-gel')
const ENAMELING_SIMPLE = getStorage('enameling-simple')
const DECORATION = getStorage('enameling-decoration')
const TIME_SCHEDULE = getStorage('schedule-time')
const DATE_SCHEDULE = getStorage('schedule-date')
const PAYMENT_METHOD = getStorage('payment_method')
const TYPE_SERVICE = getStorage('typeApplication')
const VALUE_SERVICE = getStorage('value_service')

const USER_NAME =   getStorage('user_name')
const USER_EMAIL = getStorage('user_mail')
const USER_PASSWORD =  getStorage('user_password') 
const USER_NEIGHBORHOOD = getStorage('user_neighborhood')
const USER_CEP = getStorage('user_cep')
const USER_ADDRESS = getStorage('user_address')
const USER_PHONE =  getStorage('user_phone')
const USER_IMAGE = getStorage('img-profile')

const USER_LOGGED = getStorage('isLogged')


export  {
  setStorage,
  getStorage,
  removeStorageItem,
  removeAllStorage,
  TECHNIQUE_NAME,
  PAYMENT_METHOD,
  TYPE_SERVICE,
  VALUE_SERVICE,
  TIME_SCHEDULE,
  DATE_SCHEDULE,
  DECORATION,
  ENAMELING_GEL ,
  ENAMELING_SIMPLE,
  USER_NAME,
  USER_PASSWORD,
  USER_EMAIL,
  USER_NEIGHBORHOOD,
  USER_ADDRESS,
  USER_CEP,
  USER_PHONE,
  USER_IMAGE,
  USER_LOGGED
};
