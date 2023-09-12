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
const SERVICE_VALUE = getStorage('typeAplication')




export  {
  setStorage,
  getStorage,
  removeStorageItem,
  removeAllStorage,
  TECHNIQUE_NAME,
  PAYMENT_METHOD,
  SERVICE_VALUE,
  TIME_SCHEDULE,
  DATE_SCHEDULE,
  DECORATION,
  ENAMELING_GEL ,
  ENAMELING_SIMPLE
};
