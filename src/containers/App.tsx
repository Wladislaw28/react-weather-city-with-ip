import React from 'react';
import { getIpUsers } from '../components/functional/GetIpUsers/GetIpUsers';
import { getWeather } from '../components/functional/GetWeather/GetWeather';
import { getTime } from '../components/functional/GetTime/GetTime';

import './App.css';

export interface MainWeather {
	humidity: number;
	pressure: number;
	temp: number;
	temp_max: number;
	temp_min: number;
}

export interface SysWeather {
	sunrise: number;
	sunset: number;
}

export interface Weather {
	main: string;
	description: string;
	icon: string;
}

export interface WindWeather {
	speed: number;
}

export interface WeatherData {
	main: MainWeather;
	sys: SysWeather;
	weather: Array<Weather>;
	wind: WindWeather;
}


export interface Location {
	country_flag: string;
	calling_code: string;
}

export interface LanguagesIp {
	name: string;
}

export interface IpData {
	city: string;
	country_name: string;
	continent_name: string;
	ip: string;
	location: Location;
	languages: Array<LanguagesIp>;
}


export interface TimeData {
	datetime: string;
	day_of_week: number;
	day_of_year: number;
}



export interface IAppState {
	ipData: IpData;
	weatherDate: WeatherData;
	timeData: TimeData;
}

class App extends React.Component<{}, IAppState> {

	public state = {
		ipData: {} as IpData,
		weatherDate: {} as WeatherData,
		timeData: {} as TimeData
	}

	public componentWillMount(): void {
		if (localStorage.getItem('ipData') === null && localStorage.getItem('weatherDate') === null
			&& localStorage.getItem('timeData') === null) {
			this.getInfo();
		} else {
			this.getLocalStorageData('ipData');
			this.getLocalStorageData('weatherDate');
			this.getLocalStorageData('timeData');
		}
	};

	private async getInfo(): Promise<any> {
		await getIpUsers(this.updateDate);
		await getWeather(this.state.ipData.city, this.updateDate);
		await getTime(this.state.ipData.continent_name, this.state.ipData.city, this.updateDate);
	}

	private getLocalStorageData(date: string): void {
		const json_data: any = localStorage.getItem(date);
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

	public updateDate = (config: any) => {
		this.setState(config);
	}

	public render() {

		return (
			<div className="app">
				<div className="app_container" >
					<div className="image_flag">
						<img src={this.state.ipData.location.country_flag} alt="flag"/>
					</div>
					<div className="info">

					</div>
				</div>
			</div>
		)
	}
}

export default App;
