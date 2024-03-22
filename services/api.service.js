
import https from 'https'
import {getToken, TOKEN_DICTIONARY} from './storage.service.js'
import axios from 'axios'

const getWeather = async city => {
	//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
	const token = process.env.TOKEN ?? (await getToken(TOKEN_DICTIONARY.token))

	if (!token) {
		throw console.error('API doesn`t exist or token was invalid')
	}

	//! With Axios

	const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			q: city,
			appid: token,
			lang: 'en',
			units: 'metric'
		}
	})
	return data;
	//return data;
	
	//! With https 

	//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
	// const url = new URL(
	// 	'https://api.openweathermap.org/data/2.5/weather'
	// )
	// url.searchParams.append('q', city)
	// url.searchParams.append('appid', token)
	// url.searchParams.append('lang', 'en')
	// url.searchParams.append('units', 'metric')

	// https.get(url, response => {
	// 	let res = ''
	// 	response.on('data', chunk => {
	// 		res += chunk
	// 	})
	// 	response.on('end', () => {
	// 		console.log(res)
	// 	})
	// })

}

export {getWeather}
