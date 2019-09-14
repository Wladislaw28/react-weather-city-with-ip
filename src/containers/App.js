import React from 'react';
import { getIpUsers } from '../components/GetIpUsers/GetIpUsers';
import { getWeather } from '../components/GetWeather/GetWeather';
import { getTime } from '../components/GetTime/GetTime';

import './App.css';

class App extends React.Component {

	state = {
		ipData: {},
		weatherDate: {},
		timeData: {},
		temp: '',
		temp_min: '',
		temp_max: '',
		sunrise: '',
		sunset: '',
		pressure: '',
		city: '',
		country: '',
		continent_name: '',
		flag: ''
	};

	componentWillMount = () => {
		if (localStorage.getItem('ipData') === null && localStorage.getItem('weatherDate') === null
			&& localStorage.getItem('timeData') === null) {
			this.getInfo();

		} else {
			this.getLocalStorageData('ipData');
			this.getLocalStorageData('weatherDate');
			this.getLocalStorageData('timeData');
		}
	};

	getInfo = async () => {
		await getIpUsers(this.updateDate.bind(this));
		await getWeather(this.state.ipDate.city, this.updateDate.bind(this));
		await getTime(this.state.ipDate.continent_name, this.state.ipDate.city, this.updateDate.bind(this));
	}

	getLocalStorageData = (date) => {
		const json_data = localStorage.getItem(date);
		const dataLocStor = JSON.parse(json_data);
		if (date === 'ipData') {
			this.setState({
				ipData: dataLocStor
			})
		} else if (date === 'weatherDate') {
			this.setState({
				weatherDate: dataLocStor
			})
		} else {
			this.setState({
				timeData: dataLocStor
			})
		}
	}


	// getWeather = async (city) => {
	// 	const api_weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_WEATHER}&units=metric`);
	// 	const data_weather = await api_weather.json();

	// 	const sunset = data_weather.sys.sunset;
	// 	const sunrise = data_weather.sys.sunrise;

	// 	const date = new Date();
	// 	date.setTime(sunset);
	// 	const sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	// 	date.setTime(sunrise);
	// 	const sunrise_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

	// 	this.setState({
	// 		temp: data_weather.main.temp,
	// 		temp_min: data_weather.main.temp_min,
	// 		temp_max: data_weather.main.temp_max,
	// 		sunrise: sunrise_date,
	// 		sunset: sunset_date,
	// 		pressure: data_weather.main.pressure
	// 	}, () => {
	// 		this.getTime(city);
	// 	})
	// };

	updateDate(config) {
		this.setState(config);
	}

	render() {
		const { temp, temp_max, sunset, sunrise,
			country, city, flag, pressure, temp_min, continent_name } = this.state;
		return (
			<div>
				<img src={flag} alt="" />
				<p>{temp}</p>
				<p>{country}</p>
				<p>{city}</p>
				<p>{pressure}</p>
			</div>
		)
	}
}

export default App;
