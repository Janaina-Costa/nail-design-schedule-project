import tableValues from "./tablePrice.js";
import {
  DATE_SCHEDULE,
  PAYMENT_METHOD,
  TECHNIQUE_NAME,
  TIME_SCHEDULE,
  getStorageSchedule,
  removeStorageItemSchedule,
  setStorageSchedule,
  ENAMELING_SIMPLE,
  ENAMELING_GEL,
  DECORATION,
  removeAllStorageSchedule,
} from "./storagemodel.js";

/**SELEÇÃO DO SERVIÇO PELA LISTA */
const selectServiceFromSelectList = () => {
  const list = document.querySelector("#services-list");

  list.addEventListener("change", () => {
    switch (list.value) {
      case "fiberGlass":
        removeStorageItemSchedule("typeAplication");
        removeStorageItemSchedule('value_service')
        setStorageSchedule("service", tableValues.fiberGlass.name);
      
        break;
      case "acrygel":
        removeStorageItemSchedule("typeAplication");
        setStorageSchedule("service", tableValues.acrygel.name);
      
        break;

      case "acrylic":
        removeStorageItemSchedule("typeAplication");
        setStorageSchedule("service", tableValues.acrylic.name);
      
        break;
      case "porcelain":
        removeStorageItemSchedule("typeAplication");
        setStorageSchedule("service", tableValues.porcelain.name);
      
        break;
    }
    location.reload()
  });
};
/**SELEÇÃO DO SERVIÇO PELA LISTA */
selectServiceFromSelectList()

selectServiceFromSelectList();
const showServiceSelected = () => {
  const selectedTech = document.querySelector(".selected-technique");
  selectedTech.innerHTML = TECHNIQUE_NAME;
};
showServiceSelected();

const getValue = ()=>{

 setStorageSchedule('value_service', getStorageSchedule('typeAplication') )
  console.log(getStorageSchedule('value_service'));
  let value = getStorageSchedule('value_service')
  if(!value){
    return
  }
  return value
}

/**SELEÇÃO DO CAMPO DE RADIO - SERVIÇO */

const selectValueFromRadioButton = () => {
  const radios = document.getElementsByName("radio-service");

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.value === "firstAplication") {
        removeStorageItemSchedule("maintenance");
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
              "typeAplication",
              tableValues.porcelain.maintenance
            );

            break;
        }
      }
getValue()

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

/**SELEÇÃO DO CAMPO DE CHECK - SERVIÇO */

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
const paymentsGroup = document.getElementsByName("pay-method");
const getPaymentMethod = () => {
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

const calculateService = () => {
  let value_service = getStorageSchedule('value_service')
  let esmaltSimples = getStorageSchedule('enameling-simple')
  let esmalteGel = getStorageSchedule('enameling-gel')
  let decoration = getStorageSchedule('enameling-decoration')

  

let totalValue = Number(value_service)+Number(esmaltSimples)+Number(esmalteGel)+Number(decoration)
console.log(totalValue.toFixed(2));
return totalValue.toFixed(2)

};


/**MOSTRAR RESUMO DO AGENDAMENTO */
const summaryServiceText = `${TECHNIQUE_NAME} ${ENAMELING_SIMPLE? '+ Esmaltação simples': ''} ${ENAMELING_GEL? '+ Esmaltação em  gel' : ''} ${DECORATION?"+ Decoração": ''}`;

const labelService = document.querySelector(".service-summary");
const labelDate = document.querySelector(".summary-label-date");
const labelTime = document.querySelector(".summary-label-hour");
const labelMethod = document.querySelector(".payment-method-summary");
const labelTotalValue = document.querySelector('.summary-total-value')

const handleValuesToSummary = () => {
  let paymentMethod;
  labelService.innerHTML = summaryServiceText;
  labelDate.innerHTML = DATE_SCHEDULE;
  labelTime.innerHTML = TIME_SCHEDULE;
  labelTotalValue.innerHTML = calculateService()



  if (PAYMENT_METHOD === "card") {
    paymentMethod = "Cartão de crédito/débito";
  } else if (PAYMENT_METHOD === "cash") {
    paymentMethod = "Dinheiro";
  } else {
    paymentMethod = "Pix";
  }
  labelMethod.innerHTML = paymentMethod;
};

const phrase = document.querySelector('.confirmation-phrase')

const summary = document.querySelector(".summary");
const showSummary = () => {
  handleValuesToSummary();
  if (PAYMENT_METHOD) {
    summary.style.display = "block";
  }
};
showSummary();
/**------------------------------------------ */



/**BOTÕES */


const validateInputs = (text)=>{

  if(labelService.innerHTML === '' || labelDate.innerHTML === '' || labelTime.innerHTML ==='' ){
    phrase.style.color = 'red'
    phrase.style.fontSize = '1.25rem'
    phrase.innerHTML = text

    paymentsGroup.forEach((item, i) => {
      if (getStorageSchedule("payment_method") === item.value) {
        item.checked = false;
      }
    });
  }
}

const handleConfirmationScheduleButton = ()=>{
  const btn = document.querySelector('#confirm-schedule')
  
  btn.addEventListener('click', (e)=>{
    e.preventDefault()
    validateInputs('*Favor preencher todos os campos')
 
    phrase.style.display = 'flex'
  })
}

const handleChangeScheduleButton = ()=>{
  const btnChange = document.querySelector('#change-schedule')

  btnChange.addEventListener('click', ()=>{
    paymentsGroup.forEach((item, i) => {
      if (getStorageSchedule("payment_method") === item.value) {
        item.checked = false;
      }
    });
    removeStorageItemSchedule('payment_method')
    summary.style.display = 'none'

  })
  
}

const handleCancelScheduleButton = ()=>{
  const btnCancel = document.querySelector('#cancel-schedule')
  const confirmModal = document.querySelector('.confirm-cancellation')

  const yesbtn = document.querySelector('#yes')
  const notbtn = document.querySelector('#not')

  btnCancel.addEventListener('click', ()=>{
    confirmModal.style.display = 'flex'   

  })

  yesbtn.addEventListener('click',()=>{
    removeAllStorageSchedule()
    alert('Agendamento cancelado com sucesso')
    location.reload()
  })

  notbtn.addEventListener('click', ()=>{
    confirmModal.style.display = 'none'
  })
}

handleConfirmationScheduleButton()
handleChangeScheduleButton()
handleCancelScheduleButton()