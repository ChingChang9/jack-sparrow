const https = require("https");
const { geniusAccessToken } = require("../config.json");

module.exports = query => {
	return new Promise((resolve, reject) => {
		https.request(`https://api.genius.com/${ query }`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${ geniusAccessToken }`
			}
		}, response => {
			if (response.statusCode === 200) {
				let chunks = [];

				response.on("data", chunk => chunks.push(chunk));
				response.once("end", () => resolve(JSON.parse(Buffer.concat(chunks).toString()).response));
			} else {
				reject(`Error ${ response.statusCode }: ${ response.statusMessage }`);
			}
		}).end();
	});
};
