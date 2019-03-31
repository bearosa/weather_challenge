class ResponseError {
	constructor() {
		if(arguments.length == 1) {
			this.status = 500;
			this.message = arguments[0];
		} else if(arguments.length == 2) {
			this.status = arguments[0];
			this.message = arguments[1];
		} else {
			console.error('ResponseError construction requires one or two arguments; either just "message" or "status" and "message"');
		}
	}
}

export const rest = {

	getSecurityHeader() {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    async getWeatherInfo(city, days, unit) {
        try {
            let response = await fetch('api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&units=' + unit + '&cnt=' + days,
                {
                    method: 'GET',
                    headers: rest.getSecurityHeader()
                });
            let weatherInfo = await response.json();
            return weatherInfo;
        } catch (event) {
            console.error("There was a problem with getWeatherInfo()!");
            return Promise.reject(new ResponseError('getWeatherInfo: ' + event.message));
        }
    }

}