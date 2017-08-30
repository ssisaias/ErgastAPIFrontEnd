/*  var season = fetchFromAPI('http://ergast.com/api/f1/seasons.json?limit=1&offset=67', 'GET')
  if (season) {
    document.getElementById('loading-img').style = 'display:none'
  }
*/
window.onload = () => {
  fetchSeason('http://ergast.com/api/f1/seasons.json?limit=68', 'GET')
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
      for (var season in seasons) {
        if (seasons.hasOwnProperty(season)) {
          var element = seasons[season]
          document.getElementById('seasons').insertAdjacentHTML('beforeend',`<tr>
          <td><a href="${element.url}">${element.season}</a></td>
          </tr>`)
        }
      }
      // console.log(seasons)
    })
    .catch((err) => {
      console.log(err.message)
      return undefined
    })
}
