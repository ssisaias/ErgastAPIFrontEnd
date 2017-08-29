function btnPress () {
  document.getElementById('loading-img').style = 'display:none'

  loadSeason().then((result) => {
    var Season = JSON.parse(result)

    console.log(Season)
    // console.log(Season)
  }, (err) => {
    console.log(err)
  })

  console.log('boh ya')
}
