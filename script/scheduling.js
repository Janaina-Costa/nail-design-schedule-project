import tableValues from "./tablePrice.js";
import { TECHNIQUE_NAME, getStorageSchedule,removeStorageItemSchedule, setStorageSchedule } from './storagemodel.js'


const selectServiceFromSelectList = () => {
  const list = document.querySelector("#services-list");

  list.addEventListener("change", () => {
    switch (list.value) {
      case "fiberGlass":
        setStorageSchedule("service", tableValues.fiberGlass.name);
        removeStorageItemSchedule('typeAplication')
        location.reload();
        break;
      case "acrygel":
        setStorageSchedule("service", tableValues.acrygel.name);
        removeStorageItemSchedule('typeAplication')
        location.reload();
        break;
      case "acrylic":
        setStorageSchedule("service", tableValues.acrylic.name);
        removeStorageItemSchedule('typeAplication')
        location.reload();
        break;
      case "porcelain":
        setStorageSchedule("service", tableValues.porcelain.name);
        removeStorageItemSchedule('typeAplication')
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

/*quel é o serviço selecionado 
  a
  b
  c
*/

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


/*const lala = getStorageSchedule('firstAplication')

console.log(lala);

console.log(typeof lala);*/
