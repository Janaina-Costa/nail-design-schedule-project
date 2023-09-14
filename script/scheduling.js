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


const url = 'http://localhost:3000/services/'
const getServicesByApi = async () => {
  const response = await fetch(url)
  const data = await response.json()
  return data
}


/**SELEÇÃO DO SERVIÇO PELA LISTA */
const selectServiceFromSelectList = async () => {
  const list = document.querySelector("#services-list");
  const data = await getServicesByApi()

  list.addEventListener("change", () => {
    data.find(item => {
      if (item.type === list.value) {
        removeStorageItem("typeAplication");
        removeStorageItem('value_service')
        setStorage("service", item.name);
      }
    })

    location.reload()
  });
};
selectServiceFromSelectList()

/***************************************************************/


const showServiceSelected = () => {
  const selectedTech = document.querySelector(".selected-technique");
  selectedTech.innerHTML = TECHNIQUE_NAME;
};
showServiceSelected();



const selectValueFromRadioButton = async () => {
  const radios = document.getElementsByName("radio-service");
  const data = await getServicesByApi()

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {

      data.forEach((item, i) => {
        for (let value of item.values) {
          const key = Object.keys(value);
          const val = Object.values(value)

          key.find((keyObject, indexKey) => {
            if (keyObject === radio.value) {
              if (item.name === TECHNIQUE_NAME) {
                if (radio.value === 'firstApplication') {
                  val.find((valueObject, indexValue) => {
                    if (indexKey === indexValue) {
                      setStorage('value_service', valueObject)
                    }
                  })
                }

                if (radio.value === 'maintenance') {
                  val.find((valueObject, indexValue) => {
                    if (indexKey === indexValue) {
                      setStorage('value_service', valueObject)
                    }
                  })
                }
                setStorage(
                  "typeApplication",
                  keyObject
                );
              }
            }
          })
        }
      })
    });
  });
};
selectValueFromRadioButton();
/**------------------------------------------ */

/**SELEÇÃO DO CAMPO DE CHECK - SERVIÇO */

const selectValuesFromCheckbox = async () => {
  const data = await getServicesByApi()
  const check = document.querySelectorAll(".check-service");

  check.forEach((check) => {
    check.addEventListener("click", () => {
      data.forEach(item => {
        if (item.id === 5) {
          for (let value of item.values) {
            const key = Object.keys(value)
            const val = Object.values(value)
          
            key.find((keyObject, indexKey) => {
              if (keyObject === check.value) {
                val.find((valueObject, indexValue) => {
                  if (indexKey == indexValue) {
                    setStorage(`enameling-${check.value}`, valueObject)
                  }
                  if (!check.checked) {
                    removeStorageItem(`enameling-${check.value}`)
                  }
                })
              }
            })
          }
        }
      })
      
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

  let month = data.toLocaleDateString("pt-BR", {
    month: "2-digit",
  });

  let day = data.toLocaleDateString("pt-BR", {
    day: "2-digit",
  });

  const today = `${data.getFullYear()}-${month}-${day}`;
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