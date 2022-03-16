import { useState } from 'react';

const API = {
	key: 'b0fd49f1847c270ad0ed1edf346a8017',
	base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
	const [query, setQuery] = useState('');
	const [weather, setWeather] = useState({});
	const [tempClass, setTempClass] = useState('');
	const [message, setMessage] = useState('');

	const search = async (e) => {
		if (e.key === 'Enter') {
			try {
				const response = await fetch(
					`${API.base}weather?q=${query}&units=metric&APPID=${API.key}`
				);
				if (response.ok) {
					const data = await response.json();
					setWeather(data);
					setTempClass(minimized(data.weather[0].main));
					setQuery('');
					setMessage('');
				} else {
					setMessage('Please enter a valid country');
					setWeather({});
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	const minimized = (str) => str.charAt(0).toLowerCase() + str.slice(1);

	const dateBuilder = (d) => {
		let months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		let days = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();

		return `${day} ${date} ${month} ${year}`;
	};
	return (
		<div className={`${tempClass} app`}>
			<main>
				<div className='search-box'>
					<input
						type='text'
						placeholder='Search a country'
						className='search-bar'
						onChange={(e) => setQuery(e.target.value)}
						value={query}
						onKeyDown={search}
					/>
				</div>
				{Object.keys(weather).length !== 0 ? (
					<div>
						<div className='location-box'>
							<div className='location'>
								{weather.name}, {weather.sys.country}
							</div>
							<div className='date'>{dateBuilder(new Date())} </div>
						</div>
						<div className='weather-box'>
							<div className='temp'>{Math.round(weather.main.temp)} °C</div>
							<div className='weather'>{weather.weather[0].main}</div>
						</div>
					</div>
				) : (
					<h1 className='error-message'>{message}</h1>
				)}
			</main>
		</div>
	);
}

export default App;
