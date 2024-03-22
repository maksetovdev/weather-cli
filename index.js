
import getArgs from './helpers/args.js'
import { printError,printSuccess, printHelp } from './services/log.service.js'
import { saveToken, TOKEN_DICTIONARY } from './services/storage.service.js'
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

const getForecast = async () => {
  try {
    const response = await getWeather(process.env.CITY ?? 'Nukus')
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
    printHelp()
    // help
  }
  if (args.s) 
  {
		// save city
	}
  if (args.t) 
  {
    return Token(args.t);
		// save token
	}
  // result
  getForecast();  
}


startCLI()