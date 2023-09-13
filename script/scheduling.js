import tableValues from "./tablePrice.js";
import {
  DATE_SCHEDULE,
  PAYMENT_METHOD,
  TECHNIQUE_NAME,
  TIME_SCHEDULE,
  getStorage,
  removeStorageItem,
  setStorage,
  ENAMELING_SIMPLE,
  ENAMELING_GEL,
  DECORATION,
  removeAllStorage,
} from "./storagemodel.js";

/**SELEÇÃO DO SERVIÇO PELA LISTA */
const selectServiceFromSelectList = () => {
  const list = document.querySelector("#services-list");

  list.addEventListener("change", () => {
    switch (list.value) {
      case "fiberGlass":
        removeStorageItem("typeAplication");
        removeStorageItem('value_service')
        setStorage("service", tableValues.fiberGlass.name);

        break;
      case "acrygel":
        removeStorageItem("typeAplication");
        setStorage("service", tableValues.acrygel.name);

        break;

      case "acrylic":
        removeStorageItem("typeAplication");
        setStorage("service", tableValues.acrylic.name);

        break;
      case "porcelain":
        removeStorageItem("typeAplication");
        setStorage("service", tableValues.porcelain.name);

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

const getValue = () => {

  setStorage('value_service', getStorage('typeAplication'))
  let value = getStorage('value_service')
  if (!value) {
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
        removeStorageItem("maintenance");
        switch (TECHNIQUE_NAME) {
          case "Fibra de Vidro":
            setStorage(
              "typeAplication",
              tableValues.fiberGlass.firstAplication
            );


            break;
          case "Acrigel":
            setStorage(
              "typeAplication",
              tableValues.acrygel.firstAplication
            );

            break;
          case "Acrílico":
            setStorage(
              "typeAplication",
              tableValues.acrylic.firstAplication
            );

            break;

          case "Porcelana":
            setStorage(
              "typeAplication",
              tableValues.porcelain.firstAplication
            );
            break;
        }
      } else if (radio.value === "maintenance") {
        removeStorageItem("firstAplication");

        switch (TECHNIQUE_NAME) {
          case "Fibra de Vidro":
            setStorage(
              "typeAplication",
              tableValues.fiberGlass.maintenance
            );

            break;
          case "Acrigel":
            setStorage("maintenance", tableValues.acrygel.maintenance);

            break;
          case "Acrílico":
            setStorage(
              "typeAplication",
              tableValues.acrylic.maintenance
            );

            break;

          case "Porcelana":
            setStorage(
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

/**SELEÇÃO DO CAMPO DE CHECK - SERVIÇO */

const selectValuesFromCheckbox = () => {
  const check = document.querySelectorAll(".check-service");

  check.forEach((item, i) => {
    item.addEventListener("click", () => {
      if (item.value === "simple") {
        setStorage("enameling-simple", tableValues.enameling.simple);

        if (!item.checked) {
          removeStorageItem("enameling-simple");
        }
      } else if (item.value === "gel") {
        setStorage("enameling-gel", tableValues.enameling.gel);

        if (!item.checked) {
          removeStorageItem("enameling-gel");
        }
      } else if (item.value === "decoration") {
        setStorage(
          "enameling-decoration",
          tableValues.enameling.decoration
        );

        if (!item.checked) {
          removeStorageItem("enameling-decoration");
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

  if (Boolean(getStorage("firstAplication"))) {
    radios.forEach((item) => {
      if (getStorage("firstAplication") === item.value) {
        item.checked = true;
      }
    });
    if (Boolean(getStorage("maintenance"))) {
      radios.forEach((item) => {
        if (getStorage("maintenance") === item.value) {
          item.checked = true;
        }
      });
    }
  }

  if (Boolean(getStorage("enameling-simple"))) {
    check[0].checked = true;
  }
  if (Boolean(getStorage("enameling-gel"))) {
    check[1].checked = true;
  }
  if (Boolean(getStorage("enameling-decoration"))) {
    check[2].checked = true;
  }

  if (Boolean(getStorage("payment_method"))) {
    paymentsGroup.forEach((item, i) => {
      if (getStorage("payment_method") === item.value) {
        item.checked = true;
      }
    });
  }
};
persistsCheckedField();
/**------------------------------------------ */



/**CALENDÁRIO */
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

  date.value = getStorage("schedule-date") ?? today;
  date.setAttribute("min", today);

  date.addEventListener("change", () => {
    setStorage("schedule-date", date.value);
  });
};

const setCalendarTime = () => {
  const time = document.querySelector("#time");
  const now = formateTime();

  time.value = getStorage("schedule-time") ?? now;
  time.setAttribute("min", now);
  time.addEventListener("change", () => {
    setStorage("schedule-time", time.value);
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
        setStorage("payment_method", methodCash);
      } else if (method.value === methodCard) {
        setStorage("payment_method", methodCard);
      } else {
        setStorage("payment_method", methodPix);
      }
      location.reload();
    });
  });
};
getPaymentMethod();

/**------------------------------------------ */

const calculateService = () => {
  let value_service = getStorage('value_service')
  let enamelingSimple = getStorage('enameling-simple')
  let enamelingGel = getStorage('enameling-gel')
  let decoration = getStorage('enameling-decoration')

  let totalValue = Number(value_service) + Number(enamelingSimple) + Number(enamelingGel) + Number(decoration)
  return totalValue.toFixed(2)

};


/**MOSTRAR RESUMO DO AGENDAMENTO */
const summaryServiceText = `${TECHNIQUE_NAME} ${ENAMELING_SIMPLE ? '+ Esmaltação simples' : ''} ${ENAMELING_GEL ? '+ Esmaltação em  gel' : ''} ${DECORATION ? "+ Decoração" : ''}`;

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

const handleConfirmationScheduleButton = () => {
  const btn = document.querySelector('#confirm-schedule')

  btn.addEventListener('click', (e) => {
    e.preventDefault()

    if (labelService.innerHTML === '' || labelDate.innerHTML === '' || labelTime.innerHTML === '') {
      phrase.style.color = 'red'
      phrase.style.fontSize = '1.25rem'
      phrase.style.display = 'flex'
      phrase.innerHTML = '*Favor preencher todos os campos'
      
      paymentsGroup.forEach((item, i) => {
        if (getStorage("payment_method") === item.value) {
          item.checked = false;
        }
      });

    } else if (labelService.innerHTML.length > 0 && labelDate.innerHTML.length > 0 && labelTime.innerHTML.length > 0) {
      location.assign('./thankyou.html')
    }

  })
}

const handleChangeScheduleButton = () => {
  const btnChange = document.querySelector('#change-schedule')

  btnChange.addEventListener('click', () => {
    paymentsGroup.forEach((item, i) => {
      if (getStorage("payment_method") === item.value) {
        item.checked = false;
      }
    });
    removeStorageItem('payment_method')
    summary.style.display = 'none'

  })

}

const handleCancelScheduleButton = () => {
  const btnCancel = document.querySelector('#cancel-schedule')
  const confirmModal = document.querySelector('.confirm-cancellation')

  const yesbtn = document.querySelector('#yes')
  const notbtn = document.querySelector('#not')

  btnCancel.addEventListener('click', () => {
    confirmModal.style.display = 'flex'

  })

  yesbtn.addEventListener('click', () => {
    removeAllStorage()
    alert('Agendamento cancelado com sucesso')
    location.reload()
  })

  notbtn.addEventListener('click', () => {
    confirmModal.style.display = 'none'
  })
}

handleConfirmationScheduleButton()
handleChangeScheduleButton()
handleCancelScheduleButton()
/****------------- */