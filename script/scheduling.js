import tableValues from "./tablePrice.js";
import {
  TECHNIQUE_NAME,
  getStorageSchedule,
  removeStorageItemSchedule,
  setStorageSchedule,
} from "./storagemodel.js";

const selectServiceFromSelectList = () => {
  const list = document.querySelector("#services-list");

  list.addEventListener("change", () => {
    switch (list.value) {
      case "fiberGlass":
        setStorageSchedule("service", tableValues.fiberGlass.name);
        removeStorageItemSchedule("typeAplication");
        location.reload();
        break;
      case "acrygel":
        setStorageSchedule("service", tableValues.acrygel.name);
        removeStorageItemSchedule("typeAplication");
        location.reload();
        break;
      case "acrylic":
        setStorageSchedule("service", tableValues.acrylic.name);
        removeStorageItemSchedule("typeAplication");
        location.reload();
        break;
      case "porcelain":
        setStorageSchedule("service", tableValues.porcelain.name);
        removeStorageItemSchedule("typeAplication");
        location.reload();
    }
  });
};

const showServiceSelected = () => {
  const selectedTech = document.querySelector(".selected-technique");
  selectServiceFromSelectList();
  selectedTech.innerHTML = TECHNIQUE_NAME;
};
showServiceSelected();

const selectValueFromRadioButton = () => {
  const radios = document.getElementsByName("radio-service");

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.value === "first") {
        switch (TECHNIQUE_NAME) {
          case "Fibra de Vidro":
            setStorageSchedule(
              "typeAplication",
              tableValues.fiberGlass.firstAplication
            );
            break;
          case "Acrigel":
            setStorageSchedule(
              "typeAplication",
              tableValues.acrygel.firstAplication
            );
            break;
          case "Acrílico":
            setStorageSchedule(
              "typeAplication",
              tableValues.acrylic.firstAplication
            );
            break;

          case "Porcelana":
            setStorageSchedule(
              "typeAplication",
              tableValues.porcelain.firstAplication
            );
            break;
        }
      } else if (radio.value === "maintenance") {
        switch (TECHNIQUE_NAME) {
          case "Fibra de Vidro":
            setStorageSchedule(
              "typeAplication",
              tableValues.fiberGlass.maintenance
            );
            break;
          case "Acrigel":
            setStorageSchedule(
              "typeAplication",
              tableValues.acrygel.maintenance
            );
            break;
          case "Acrílico":
            setStorageSchedule(
              "typeAplication",
              tableValues.acrylic.maintenance
            );
            break;

          case "Porcelana":
            setStorageSchedule(
              "typeAplication",
              tableValues.porcelain.maintenance
            );
            break;
        }
      }
    });
  });
};
selectValueFromRadioButton();

const selectValuesFromCheckbox = () => {
  const check = document.querySelectorAll(".check-service");

  check.forEach((item, i) => {
    item.addEventListener("click", () => {
      if (item.value === "simple") {
        setStorageSchedule("enameling-simple", tableValues.enameling.simple);

        if (!item.checked) {
          removeStorageItemSchedule("enameling-simple");
        }
      } else if (item.value === "gel") {
        setStorageSchedule("enameling-gel", tableValues.enameling.gel);

        if (!item.checked) {
          removeStorageItemSchedule("enameling-gel");
        }
      } else if (item.value === "decoration") {
        setStorageSchedule(
          "enameling-decoration",
          tableValues.enameling.decoration
        );

        if (!item.checked) {
          removeStorageItemSchedule("enameling-decoration");
        }
      }
    });
  });
};
selectValuesFromCheckbox();

const persistsCheckedField = () => {
  const check = document.querySelectorAll(".check-service");
  const paymentsGroup = document.getElementsByName('pay-method')

  if (Boolean(getStorageSchedule("enameling-simple"))) {
    check[0].checked = true;
  }
  if (Boolean(getStorageSchedule("enameling-gel"))) {
    check[1].checked = true;
  }
  if (Boolean(getStorageSchedule("enameling-decoration"))) {
    check[2].checked = true;
  }

  if(Boolean(getStorageSchedule('payment_method'))){
   paymentsGroup.forEach((item, i) =>{
    if(getStorageSchedule('payment_method')=== item.value){
      item.checked = true
    }
   })
  }
}
persistsCheckedField();

/**CALENDAR */
const formatDate = () => {
  const data = new Date();

  let mounth = data.toLocaleDateString("pt-BR", {
    month: "2-digit",
  });

  let day = data.toLocaleDateString("pt-BR", {
    day: "2-digit",
  });

  const today = `${data.getFullYear()}-${mounth}-${day}`;
  return today;
};

const formateTime = () => {
  const time = new Date();

  let hour = time.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
  });
  let min = time.toLocaleTimeString("pt-BR", {
    minute: "2-digit",
  });

  const now = `${hour}:${min}`;
  return now;
};

const setCalendarDate = () => {
  const date = document.querySelector("#date");

  const today = formatDate();

  date.value = getStorageSchedule("schedule-date") ?? today;
  date.setAttribute("min", today);

  date.addEventListener("change", () => {
    setStorageSchedule("schedule-date", date.value);
  });
};

const setCalendarTime = () => {
  const time = document.querySelector("#time");
  const now = formateTime();

  time.value = getStorageSchedule("schedule-time") ?? now;
  time.setAttribute("min", now);
  time.addEventListener("change", () => {
    setStorageSchedule("schedule-time", time.value);
  });
};

setCalendarDate();
setCalendarTime();

/**CALENDAR */

/**PAYMENT */

const getPaymentMethod = ()=>{
  const paymentsGroup = document.getElementsByName('pay-method')
  const methodCash = document.querySelector("#cash").value;
  const methodCard = document.querySelector("#card").value;
  const methodPix = document.querySelector("#pix").value;

  paymentsGroup.forEach((method, i)=>{
    method.addEventListener('change', ()=>{
      if(method.value === methodCash){
       setStorageSchedule('payment_method', methodCash)
      }else if(method.value === methodCard){
        setStorageSchedule('payment_method', methodCard)
      }else{
        setStorageSchedule('payment_method', methodPix) 
      }

    })
  })



}
getPaymentMethod()


/**PAYMENT */
