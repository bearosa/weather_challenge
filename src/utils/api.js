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

export const api = {

	getSecurityHeader() {
        return {
            'Accept': 'text/plain',
            'Content-Type': 'text/plain'
        }
    },

    async getWeatherInfo(city, days, unit) {
        try {
            let response = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=c06276245dc122cefce0103f8cb90a29',
                {
                    method: 'GET',
                    headers: api.getSecurityHeader()
                });
            let weatherInfo = await response.json();
            return weatherInfo;
        } catch (event) {
            console.error("There was a problem with getWeatherInfo()!");
            return Promise.reject(new ResponseError('getWeatherInfo: ' + event.message));
        }
    }

}