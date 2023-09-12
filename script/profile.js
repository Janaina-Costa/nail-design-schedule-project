const btnToDelete = document.querySelector('.ph-trash')

const row = document.querySelectorAll('tbody tr')

row.forEach((item ,i)=>{
  item.addEventListener('click', (e)=>{
    let linha = item

    btnToDelete.addEventListener('click', (e)=>{
      linha.style.display = 'none'
    })
  })
})