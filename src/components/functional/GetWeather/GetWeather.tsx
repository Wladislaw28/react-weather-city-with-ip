import * as React from 'react';
import { API_KEY_WEATHER } from '../../../constants/constants';
import {setLocalStorage} from '../../../setLocalStorage';

export async function getWeather(city: string, update: (any) => any): Promise<any> {

    const api_weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_WEATHER}&units=metric`);
    const data_weather = await api_weather.json();

    update({
        weatherDate: data_weather
    });

    setLocalStorage(data_weather, 'weatherDate');
}