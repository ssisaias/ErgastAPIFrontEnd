function btnPress () {
  document.getElementById('loading-img').style = 'display:none'

  fetch('http://ergast.com/api/f1/seasons.json?limit=1&offset=67',{method: "GET"}).then
  ( (response)=> {
    if(response.ok){
      return response.json()
    }
  }).then((response)=>{
    alert(response["MRData"]["SeasonTable"]["Seasons"][0]["season"])
    console.log(response)
  })
  .catch((err)=>{
    console.log('Deu ruim ' + err.message)
  })

}
