import { DATE_SCHEDULE, TIME_SCHEDULE } from "./storagemodel.js"

const date = document.querySelector('.current-schedule')
const dateRow = document.querySelector('.current-schedule-date')

const icon = document.querySelector('.ph-calendar-check')

  if(Boolean(!DATE_SCHEDULE)){
  date.style.display = 'none'
   
  }else{
     dateRow.textContent = `${DATE_SCHEDULE } | ${TIME_SCHEDULE} `
   
  }
