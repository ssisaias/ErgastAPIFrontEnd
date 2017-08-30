window.onload = () => {
  fetchSeason('http://ergast.com/api/f1/seasons.json?limit=68', 'GET')
  // fetchSchedule('http://ergast.com/api/f1/2012.json', 'GET')
}

function fetchSeason (url, httpVerb) {
  fetch(url, {
    method: httpVerb
  }).then((response) => {
    if (response.ok) {
      return response.json()
    }
  })
    .then((response) => {
      document.getElementById('season-loading').className = 'hidden'
      document.getElementById('season-table').className = 'visible'
      var seasons = response['MRData']['SeasonTable']['Seasons']
      seasons.reverse()
      seasons.forEach(function (element) {
        document.getElementById('seasons').insertAdjacentHTML('beforeend', `<tr>
        <td><a onclick="javascript:fetchSchedule('http://ergast.com/api/f1/'+${element.season}+'.json','GET')" class="pure-button" >${element.season}</a></td>
        <td><a class="pure-button" href="${element.url}" target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i></a></td>
        </tr>`)
      }, this)
      // console.log(seasons)
    })
    .catch((err) => {
      console.log(err.message)
      return undefined
    })
}

function fetchSchedule (url, httpVerb) {
  document.getElementById('schedule-table').className = 'hidden'
  document.getElementById('schedule-loading').className = 'loader visible'
  document.getElementById('schedules').innerHTML = ''
  document.getElementById('current-season').innerHTML = ''
  fetch(url, {
    method: httpVerb
  }).then((response) => {
    if (response.ok) {
      console.log(response)
      return response.json()
    }
  })
    .then((response) => {
      document.getElementById('schedule-loading').className = 'hidden'
      document.getElementById('schedule-table').className = 'visible'
      var races = response['MRData']['RaceTable']['Races']
      races.forEach(function (element) {
        document.getElementById('schedules').insertAdjacentHTML('beforeend', `<tr>
        <td>${element.round}</td>
        <td>${element.date}</td>
        <td>${element.time}</td>
        <td>${element.Circuit.circuitName}</td>
        <td>${element.Circuit.Location.locality}</td>
        <td>${element.Circuit.Location.country}</td>
        <td><a href="${element.url}" target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i></a></td>
        </tr>`)
      }, this)
      document.getElementById('current-season').innerHTML = `Temporada ${response['MRData']['RaceTable']['season']}`
      document.getElementById('current-season-winner').innerHTML = `Campeão da temporada: ${response['MRData']['RaceTable']['season']}`
      console.log(`http://ergast.com/api/f1/${response['MRData']['RaceTable']['season']}/driverStandings/1.json`)
      // Erro aqui!
      fetch(`http://ergast.com/api/f1/${response['MRData']['RaceTable']['season']}/driverStandings/1.json`).then((response)=>{
        var json = response.json()
        var champs = json['MRData']['StandingsTable']['StandingsLists']['DriverStandings']['Driver']
        var name = champs.givenName + ' ' + champs.familyName
        document.getElementById('current-season-winner').innerHTML = `Campeão da temporada: ${name}`
      })
      // console.log(seasons)
    })
    .catch((err) => {
      console.log(err.message)
      return undefined
    })
}
