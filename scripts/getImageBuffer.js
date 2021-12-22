const https = require("https");

module.exports = imageUrl => {
	return new Promise(resolve => {
		https.request(imageUrl, response => {
			let chunks = [];
			response.on("data", chunk => chunks.push(chunk));
			response.on("end", () => resolve(Buffer.concat(chunks)));
		}).end();
	});
};
