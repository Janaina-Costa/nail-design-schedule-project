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

const FIRST_APLLY = getStorageSchedule('firstAplication')
const MAINTENANCE = getStorageSchedule('maintenance')




export  {
  setStorageSchedule,
  getStorageSchedule,
  removeStorageItemSchedule,
  removeAllStorageSchedule,
  TECHNIQUE_NAME,
  PAYMENT_METHOD,
  FIRST_APLLY,
  MAINTENANCE,
  TIME_SCHEDULE,
  DATE_SCHEDULE
};
