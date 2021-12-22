const getArtistTitle = require("get-artist-title");
const geniusRequest = require("./geniusRequest.js");
const reader = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout
});

module.exports = async videoTitle => {
	const [ artist, songTitle ] = getArtistTitle(videoTitle);
	return await geniusRequest(`search?q=${ songTitle } ${ artist }`).then(async data => {
		let entry;
		let noConfirm = false;
		while (!entry) {
			while (!data.hits.length || noConfirm) {
				data = await getInput("Can't find the song? What's the title? ", async title => {
					noConfirm = false;
					return await geniusRequest(`search?q=${ title }`);
				});
			}
			for (const hit of data.hits) {
				if (await getInput(hit.result.full_title) === "") {
					entry = hit.result;
					break;
				}
			}
			noConfirm = true;
		}
		reader.close();
		return [entry.id, entry.song_art_image_url, entry.url];
	});
};

function getInput(promptText, fallback = r => r) {
	return new Promise(resolve => {
		reader.question(promptText + " ", response => resolve(fallback(response)));
	});
}
