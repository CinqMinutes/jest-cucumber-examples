import React, { useState, useEffect } from 'react';

const Meteo: React.FC = () => {
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=Lille,france&units=metric&lang=fr&APPID=8842bad529b81b6b7ab08ec713e0b70d'
    ).then(data => {
      data.json().then(json => {
        setDescription(json.weather[0].description);
      });
    });
  });

  return <span id="description">{description}</span>;
};

export default Meteo;
