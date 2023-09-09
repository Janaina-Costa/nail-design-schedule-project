import tableValues from "./tablePrice.js";

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

/*const getAllStorageKeys = (i)=>{
    for( i=0; i<localStorage.length;i++){
        return localStorage.getItem(i)
    }
}*/


/**
 * técnica
 * opção radio
 * opção check
 */

const selectValueFromRadioButton = () => {
  const radios = document.getElementsByName("service");

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.value === "first") {
        setStorageSchedule("firstAplication", tableValues.firstAplication);
        removeStorageItemSchedule("maintenance");
      } else if (radio.value === "maintenance") {
        setStorageSchedule("maintenance", tableValues.maintenance);
        removeStorageItemSchedule("firstAplication");
      }
    });
  });
};

selectValueFromRadioButton()


const selectValuesFromCheckbox = ()=>{
    const check = document.querySelectorAll('.check-service')
    
    check.forEach((item, i)=>{
        item.addEventListener('click', ()=> {
            if(item.value === 'simple' ){
                setStorageSchedule('enameling-simple', tableValues.enameling.simple)
               
                if(!item.checked){
                    removeStorageItemSchedule('enameling-simple')
                }
            }else if(item.value === 'gel'){
                setStorageSchedule('enameling-gel', tableValues.enameling.gel)

                if(!item.checked){
                    removeStorageItemSchedule('enameling-gel')
                }
            }else if(item.value === 'decoration'){
                setStorageSchedule('enameling-decoration', tableValues.enameling.decoration)
                
                if(!item.checked){
                    removeStorageItemSchedule('enameling-decoration')
                }
            }
            
        })
    })
}
selectValuesFromCheckbox()

/*const lala = getStorageSchedule('firstAplication')

console.log(lala);

console.log(typeof lala);*/
