export const weather = {
  url:
    'https://api.openweathermap.org/data/2.5/weather?q=Lille,france&units=metric&lang=fr&APPID=8842bad529b81b6b7ab08ec713e0b70d',
  result: {
    coord: {
      lon: 3.07,
      lat: 50.63
    },
    weather: [
      {
        id: 803,
        main: 'Clouds',
        description: 'nuageux',
        icon: '04n'
      }
    ],
    base: 'stations',
    main: {
      temp: 1.7,
      pressure: 1018,
      humidity: 93,
      temp_min: -1.11,
      temp_max: 4
    },
    visibility: 10000,
    wind: {
      speed: 1.5,
      deg: 100
    },
    rain: {},
    clouds: {
      all: 73
    },
    dt: 1574203389,
    sys: {
      type: 1,
      id: 6559,
      country: 'FR',
      sunrise: 1574147320,
      sunset: 1574179061
    },
    timezone: 3600,
    id: 2998324,
    name: 'Lille',
    cod: 200
  }
};
