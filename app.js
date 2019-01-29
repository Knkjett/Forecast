//=============================STORAGE
class Storage {
  constructor(key) {
    this.key = key;
  }
  getStorage() {
    const data = window.localStorage.getItem(this.key);
    if (data) {
      return JSON.parse(data);
    }
    return data;
  }
  save(data) {
    window.localStorage.setItem(this.key, JSON.stringify(data))
  }
}
//=============================GET
const GETRequest = (url, cb) => {
  let request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', response => {
    const data = JSON.parse(response.currentTarget.response);
    cb(data);
  })
  request.send();
}


const getGifs = (search, cb) => {
  const gif_API_KEY = 'siIyo4w5mg0REENX76Sr57QTgkt3BWvY';
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${gif_API_KEY}&q=${search}`;
  if (search === "" || search.trim() === "") {
    return;
  }
  GETRequest(url, data => {
    // const gifArray = [];
    // data.data.forEach(currentGif => {
    //   const url = currentGif.images.original.url;
    //   gifArray.push(url);
    // });
    cb(data.data[0].images.original.url)
    //cb(gifArray);
  });
}

const getWeather = (lat, lng, cb) => {
  // TODO; apply some validation to lat, lng

  const URL_BASE = 'https://wt-taqqui_karim-gmail_com-0.sandbox.auth0-extend.com/darksky'
  const api_key = `b1de5a863ba9596b1ea3b3333e5b81da`;
  const url = `${URL_BASE}?api_key=${api_key}&lat=${lat}&lng=${lng}`

  GETRequest(url, data => {
    const forecast = JSON.parse(data.res.text);
    cb(forecast);
  });
}


//=======================GLOBAL HTML

const forecastBody = document.querySelector('.myForecast');
const jsinput = document.querySelector('.input');

const storage = new Storage('app-state');

//=============================STATE
let state = {
  locations: [{
    lat: 0,
    lng: 0,
    lastUpdated: 1544375218298,
    forecast: [{
      "icon": "not-loaded",
      "hi": 0,
      "lo": 0,
      "desc": "",
      "datetime": 1544342400,
      "day": "Sunday"
    }, {
      "icon": "not-loaded",
      "hi": 0,
      "lo": 0,
      "desc": "",
      "datetime": 1544428800,
      "day": "Monday"
    }, {
      "icon": "not-loaded",
      "hi": 0,
      "lo": 0,
      "desc": "",
      "datetime": 1544515200,
      "day": "Tuesday"
    }, {
      "icon": "not-loaded",
      "hi": 0,
      "lo": 0,
      "desc": "",
      "datetime": 1544601600,
      "day": "Wednesday"
    }, {
      "icon": "not-loaded",
      "hi": 0,
      "lo": 0,
      "desc": "",
      "datetime": 1544688000,
      "day": "Thursday"
    }, {
      "icon": "not-loaded",
      "hi": 0,
      "lo": 0,
      "desc": "",
      "datetime": 1544774400,
      "day": "Friday"
    }, {
      "icon": "not-loaded",
      "hi": 0,
      "lo": 0,
      "desc": "",
      "datetime": 1544860800,
      "day": "Saturday"
    }, {
      "icon": "not-loaded",
      "hi": 0,
      "lo": 0,
      "desc": "",
      "datetime": 1544947200,
      "day": "Sunday"
    }],
  }, ],
  gifs: {
    'partly-cloudy': 'https://media2.giphy.com/media/1uLQUtPLbJMQ0/giphy.gif',
    'not-loaded': 'https://media1.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
  },
  placeholder: true,
  //Original Game plan 
  //stores location 1
  // {
  //     gifArray: [],
  //     day1: {}, //stores current day, stores icon, high temp, low temp
  //     day2: {},
  //     day3: {},
  //     day4: {},
  //     day5: {},
  // }, //stores location 2
}

// let index = state.locations.length-1;
const myToHTML = (i, j) => {
  let myMonth = state.locations[i].forecast[j].datetime;
  let theMonth = new Date(myMonth).getMonth() + 1;
  let myDay = new Date(myMonth).getDate();
  let temp = 'F'
  return `
  <div class="card two wide column" style='border: black solid 2px;'>
  <div style= "text-align: center">Lat: ${state.locations[i].lat}, Lng: ${state.locations[i].lng}</div>
  <div class="header">${state.locations[i].forecast[j].day}</div>
  <div class="content">
    <img src="${state.gifs[state.locations[i].forecast[j].icon]}">
      <div>${theMonth}/${myDay}</div>
      <hr>
      <div class="description">${state.locations[i].forecast[j].desc}</div>
    <div class="purple">
      <span class="temp">${state.locations[i].forecast[j].hi} &#176${temp}</span> |
      <span class="temp">${state.locations[i].forecast[j].lo} &#176${temp}</span>
    </div>
  </div>
</div>
`
}
jsinput.addEventListener('keydown', (e) => {
  const {
    key,
    target
  } = e;
  let halves = ''
  if (key === 'Enter') {
    let str = target.value;
    if (str.includes(',')) {
      halves = target.value.split(',');
    }
    if (str.includes(' ')) {
      halves = target.value.split(' ');
    }
    pushLocation(halves[0], halves[1]);
  }
});

const pushLocation = (lat, lng) => {
  let index = state.locations.length - 1;
  getWeather(lat, lng, data => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let newLocation = {
      lat: 37.8267,
      lng: -122.4233,
      lastUpdated: 1544375218298,
      forecast: [{
        "icon": "not-loaded",
        "hi": 0,
        "lo": 0,
        "desc": "",
        "datetime": 1544342400,
        "day": "Sunday"
      }, {
        "icon": "not-loaded",
        "hi": 0,
        "lo": 0,
        "desc": "",
        "datetime": 1544428800,
        "day": "Monday"
      }, {
        "icon": "not-loaded",
        "hi": 0,
        "lo": 0,
        "desc": "",
        "datetime": 1544515200,
        "day": "Tuesday"
      }, {
        "icon": "not-loaded",
        "hi": 0,
        "lo": 0,
        "desc": "",
        "datetime": 1544601600,
        "day": "Wednesday"
      }, {
        "icon": "not-loaded",
        "hi": 0,
        "lo": 0,
        "desc": "",
        "datetime": 1544688000,
        "day": "Thursday"
      }, {
        "icon": "not-loaded",
        "hi": 0,
        "lo": 0,
        "desc": "",
        "datetime": 1544774400,
        "day": "Friday"
      }, {
        "icon": "not-loaded",
        "hi": 0,
        "lo": 0,
        "desc": "",
        "datetime": 1544860800,
        "day": "Saturday"
      }, {
        "icon": "not-loaded",
        "hi": 0,
        "lo": 0,
        "desc": "",
        "datetime": 1544947200,
        "day": "Sunday"
      }],
    }

    for (let j = 0; j < state.locations[index].forecast.length; j++) {
      getGifs(data.daily.data[j].icon, gifs => {
        state.gifs[data.daily.data[j].icon] = gifs;
        storage.save(state);
        setTimeout(() => {
          render(state)
        }, 250) 
      })


      let theDay = (data.daily.data[j].time) * 1000;
      newLocation.lat = data.latitude;
      newLocation.lng = data.longitude;
      newLocation.forecast[j].icon = data.daily.data[j].icon;
      newLocation.forecast[j].hi = data.daily.data[j].temperatureHigh;
      newLocation.forecast[j].lo = data.daily.data[j].temperatureLow;
      newLocation.forecast[j].datetime = theDay;
      newLocation.forecast[j].day = days[new Date(theDay).getDay()]
      newLocation.forecast[j].desc = data.daily.data[j].summary;
      newLocation.forecast[j].icon = data.daily.data[j].icon;
    }
    //  if ((index <= state.locations.length - 1)) {
    state.placeholder = false;
    state.locations.push(newLocation);
    // } else {
    //   for (let j = 0; j < state.locations[index].forecast.length; j++) {
    //     let theDay = (data.daily.data[j].time) * 1000;
    //     state.locations[index].lat = data.latitude;
    //     state.locations[index].lng = data.longitude;
    //     state.locations[index].forecast[j].hi = data.daily.data[j].temperatureHigh;
    //     state.locations[index].forecast[j].lo = data.daily.data[j].temperatureLow;
    //     state.locations[index].forecast[j].datetime = theDay;
    //     state.locations[index].forecast[j].day = days[new Date(theDay).getDay()]
    //     state.locations[index].forecast[j].desc = data.daily.data[j].summary;
    //   }
    index++;
    //}

    // //save data to state
    // getGifs(data.daily.data[0].icon, gifs => {
    //   console.log(gifs[0])
    // })
    // save the updated state into localstorage
    // storage.save(state);
    // render
    // setTimeout(()=>{
    //   render(state)
    // },500)
  });
}

const render = state => {
  let forecastHTML = '';
  for (let i = 0; i < state.locations.length; i++) {
    if (!state.placeholder && i === 0) {
      i++;
    }
    for (let j = 0; j < state.locations[i].forecast.length; j++) {
      forecastHTML += myToHTML(i, j);
    }
  }
  forecastBody.innerHTML = forecastHTML;
}

render(state);