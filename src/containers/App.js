import React from 'react';
import {API_KEY_WEATHER, API_KEY_IP} from '../constants/constants'

import './App.css';

class App extends React.Component {

	state = {
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
		if (localStorage.getItem('cityLocSt') === null){
			this.getIP();
		} else {
			const json_city  = localStorage.getItem("cityLocSt");
			const json_continent  = localStorage.getItem("continentLocSt");
			const cityLocSt = JSON.parse(json_city);
			const continentLocSt = JSON.parse(json_continent);
			this.setState({
				city: cityLocSt,
				continent_name: continentLocSt
			}, () => {
				this.getWeather(this.state.city, this.state.continent_name);
			})
		}
	};

	componentDidUpdate = () => {
		const cityLocSt = JSON.stringify(this.state.city);
		const continentLocSt = JSON.stringify(this.state.continent_name);
		localStorage.setItem("cityLocSt", cityLocSt);
		localStorage.setItem("continentLocSt", continentLocSt);
	};

	getIP = async () => {
		const api_ip = await fetch(`http://api.ipstack.com/check?access_key=${API_KEY_IP}`);
		const data_ip = await api_ip.json();
		console.log(data_ip)
		this.setState({
			city: data_ip.city,
			country: data_ip.country_name,
			flag: data_ip.location.country_flag,
			continent_name: data_ip.continent_name
		});
		this.getWeather(this.state.city, this.state.continent_name);
	};

	getWeather = async (city, continent_name) => {
		const api_weather = await fetch(`https://api.openweathermap.org/data/2.5/
		weather?q=${city}&appid=${API_KEY_WEATHER}&units=metric`);
		const data_weather = await api_weather.json();

		const sunset = data_weather.sys.sunset;
		const sunrise = data_weather.sys.sunrise;

		const date = new Date();
		date.setTime(sunset);
		const sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
		date.setTime(sunrise);
		const sunrise_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

		this.setState({
			temp: data_weather.main.temp,
			temp_min: data_weather.main.temp_min,
			temp_max: data_weather.main.temp_max,
			sunrise: sunrise_date,
			sunset: sunset_date,
			pressure: data_weather.main.pressure
		}, () => {
			this.getTime(continent_name, city);
		})
	};

	getTime = async (continent, city) => {
		const api_time = await fetch(`http://worldtimeapi.org/api/timezone/${continent}/${city}`);
		const data_time = await api_time.json();
		console.log(data_time)
	};

	render() {
		const {temp , temp_max, sunset, sunrise,
			country, city, flag, pressure, temp_min, continent_name} = this.state;
		return(
			<div>

			</div>
		)
	}
}

export default App;
