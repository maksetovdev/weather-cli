
import getArgs from './helpers/args.js'
import { printError,printSuccess, printHelp } from './services/log.service.js'
import { getToken, saveToken, TOKEN_DICTIONARY } from './services/storage.service.js'
import { getWeather } from './services/api.service.js'

const Token = async token => {
  if(!token.length) {
    printError("Token doesn`t exist")
    return 
  }
  try {
    await saveToken(TOKEN_DICTIONARY.token, token)
    printSuccess('Token was saved!')
  } catch (error) {
    printError(error.message)
  }
}

const SaveCity = async city => {
	if (!city.length) {
		printError('City doesn`t exist')
		return
	}
	try {
		await saveToken(TOKEN_DICTIONARY.city, city)
		printSuccess('City was saved!')
	} catch (error) {
		printError(error.message)
	}
}

const getForecast = async () => {
  try { 
    const city = process.env.CITY ?? await getToken(TOKEN_DICTIONARY.city)
    const response = await getWeather(city)
    console.log(response);
  } catch (error) {
    if (error?.response?.status == 404) {
      printError("City not found")
    } else if(error?.response?.status == 401)  {
      printError('Invalid Token')
    } else {
      printError(error.message)
    }
    
  }
} 

const startCLI = () => 
{
  const args = getArgs(process.argv)
  // console.log(args);
  //console.log(process.env);
  if(args.h)
  {
    return printHelp()
    // help
  }
  if (args.s) 
  {
    return SaveCity(args.s)
		// save city
	}
  if (args.t) 
  {
    return Token(args.t);
		// save token
	}
  // result
  return getForecast();  
}

startCLI()