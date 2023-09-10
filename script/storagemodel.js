const setStorageSchedule = (key, value) => {
  localStorage.setItem(key, value);
};
const getStorageSchedule = (key) => {
  return localStorage.getItem(key);
};
const removeStorageItemSchedule = (key) => {
  localStorage.removeItem(key);
};
const removeAllStorageSchedule = () => {
  localStorage.clear();
};

const TECHNIQUE_NAME = getStorageSchedule("service");
const TIME_SCHEDULE = getStorageSchedule('schedule-time')
const DATE_SCHEDULE = getStorageSchedule('schedule-date')
const PAYMENT_METHOD = getStorageSchedule('payment_method')


const SERVICE_VALUE = getStorageSchedule('typeAplication')




export  {
  setStorageSchedule,
  getStorageSchedule,
  removeStorageItemSchedule,
  removeAllStorageSchedule,
  TECHNIQUE_NAME,
  PAYMENT_METHOD,
  SERVICE_VALUE,
  TIME_SCHEDULE,
  DATE_SCHEDULE
};
