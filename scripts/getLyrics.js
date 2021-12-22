const https = require("https");
const cheerio = require("cheerio");

module.exports = url => {
	return new Promise((resolve, reject) => {
		https.request(url, { method: "GET" }, response => {
			if (response.statusCode === 200) {
				let chunks = [];

				response.on("data", chunk => chunks.push(chunk));
				response.once("end", () => {
					const $ = cheerio.load(Buffer.concat(chunks));
					$("div[data-lyrics-container='true']").find("br").replaceWith("\n");
					resolve($("div[data-lyrics-container='true']").text());
				});
			} else {
				reject(`Error ${ response.statusCode }: ${ response.statusMessage }`);
			}
		}).end();
	});
};
