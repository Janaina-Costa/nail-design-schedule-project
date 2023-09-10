import tableValues from "./tablePrice.js";
import {
  DATE_SCHEDULE,
  FIRST_APLLY,
  MAINTENANCE,
  PAYMENT_METHOD,
  TECHNIQUE_NAME,
  TIME_SCHEDULE,
  getStorageSchedule,
  removeStorageItemSchedule,
  setStorageSchedule,
} from "./storagemodel.js";

/**SELEÇÃO DO SERVIÇO PELA LISTA */
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
        break;
    }
  });
};
/**SELEÇÃO DO SERVIÇO PELA LISTA */

/**EXIBIÇÃO EM TELA DO SERVIÇO SELECIONADO */
location.reload;
const showServiceSelected = () => {
  const selectedTech = document.querySelector(".selected-technique");
  selectServiceFromSelectList();
  selectedTech.innerHTML = TECHNIQUE_NAME;
};
showServiceSelected();
/**------------------------------------------ */

/**SELECÇÃO DO CAMPO DE RADIO - SERVIÇO */

const selectValueFromRadioButton = () => {
  const radios = document.getElementsByName("radio-service");

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.value === "firstAplication") {
        removeStorageItemSchedule("maintenance");
        switch (TECHNIQUE_NAME) {
          case "Fibra de Vidro":
            setStorageSchedule(
              "firstAplication",
              tableValues.fiberGlass.firstAplication
            );

            break;
          case "Acrigel":
            setStorageSchedule(
              "firstAplication",
              tableValues.acrygel.firstAplication
            );

            break;
          case "Acrílico":
            setStorageSchedule(
              "firstAplication",
              tableValues.acrylic.firstAplication
            );

            break;

          case "Porcelana":
            setStorageSchedule(
              "firstAplication",
              tableValues.porcelain.firstAplication
            );
            break;
        }
      } else if (radio.value === "maintenance") {
        removeStorageItemSchedule("firstAplication");

        switch (TECHNIQUE_NAME) {
          case "Fibra de Vidro":
            setStorageSchedule(
              "typeAplication",
              tableValues.fiberGlass.maintenance
            );

            break;
          case "Acrigel":
            setStorageSchedule("maintenance", tableValues.acrygel.maintenance);

            break;
          case "Acrílico":
            setStorageSchedule(
              "typeAplication",
              tableValues.acrylic.maintenance
            );

            break;

          case "Porcelana":
            setStorageSchedule(
              "maintenance",
              tableValues.porcelain.maintenance
            );

            break;
        }
      }
    });
  });
};
selectValueFromRadioButton();
/**------------------------------------------ */

/**SELECÇÃO DO CAMPO DE CHECK - SERVIÇO */

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
/**------------------------------------------ */

/**PERSISTINDO SELEÇÃO DOS INPUTS */

const persistsCheckedField = () => {
  const radios = document.getElementsByName("radio-service");
  const check = document.querySelectorAll(".check-service");
  const paymentsGroup = document.getElementsByName("pay-method");

  if (Boolean(getStorageSchedule("firstAplication"))) {
    console.log("caiu");
    radios.forEach((item) => {
      if (getStorageSchedule("firstAplication") === item.value) {
        item.checked = true;
      }
    });
    if (Boolean(getStorageSchedule("maintenance"))) {
      radios.forEach((item) => {
        if (getStorageSchedule("maintenance") === item.value) {
          item.checked = true;
        }
      });
    }
  }

  if (Boolean(getStorageSchedule("enameling-simple"))) {
    check[0].checked = true;
  }
  if (Boolean(getStorageSchedule("enameling-gel"))) {
    check[1].checked = true;
  }
  if (Boolean(getStorageSchedule("enameling-decoration"))) {
    check[2].checked = true;
  }

  if (Boolean(getStorageSchedule("payment_method"))) {
    paymentsGroup.forEach((item, i) => {
      if (getStorageSchedule("payment_method") === item.value) {
        item.checked = true;
      }
    });
  }
};
persistsCheckedField();
/**------------------------------------------ */

/**SELECÇÃO DO CAMPO DE CHECK - SERVIÇO */

/**CALENDARIO */
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

/**------------------------------------------ */

/**PAGAMENTO */
const getPaymentMethod = () => {
  const paymentsGroup = document.getElementsByName("pay-method");
  const methodCash = document.querySelector("#cash").value;
  const methodCard = document.querySelector("#card").value;
  const methodPix = document.querySelector("#pix").value;

  paymentsGroup.forEach((method, i) => {
    method.addEventListener("change", () => {
      if (method.value === methodCash) {
        setStorageSchedule("payment_method", methodCash);
      } else if (method.value === methodCard) {
        setStorageSchedule("payment_method", methodCard);
      } else {
        setStorageSchedule("payment_method", methodPix);
      }
      location.reload();
    });
  });
};
getPaymentMethod();

/**------------------------------------------ */

const calculateService = ()=>{

}

/**MOSTRAR RESUMO DO AGENDAMENTO */
const handleValuesToSummary = () => {
  const labelService = document.querySelector(".service-summary")
  const labelDate = document.querySelector('.summary-label-date')
  const labelTime = document.querySelector('.summary-label-hour')
  const labelMethod = document.querySelector('.payment-method-summary')
  let paymentMethod
  labelService.innerHTML = TECHNIQUE_NAME;
  labelDate.innerHTML = DATE_SCHEDULE
  labelTime.innerHTML = TIME_SCHEDULE
  
  if(PAYMENT_METHOD === 'card'){
    paymentMethod = 'Cartão de crédito/débito'
  }else if(PAYMENT_METHOD === 'cash'){
    paymentMethod = 'Dinheiro'
  }else{
    paymentMethod= 'Pix'
  }
  labelMethod.innerHTML = paymentMethod
};
const showSumary = () => {
  handleValuesToSummary();
  const summary = document.querySelector(".summary");
  if (PAYMENT_METHOD) {
    summary.style.display = "block";
  }
};
showSumary();
/**------------------------------------------ */
