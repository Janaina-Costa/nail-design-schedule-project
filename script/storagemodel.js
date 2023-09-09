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


export  {
  setStorageSchedule,
  getStorageSchedule,
  removeStorageItemSchedule,
  removeAllStorageSchedule,
  TECHNIQUE_NAME,
};
