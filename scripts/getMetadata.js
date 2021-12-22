const geniusRequest = require("./geniusRequest.js");
const confirmSong = require("./confirmSong.js");
const getImageBuffer = require("./getImageBuffer.js");
const getLyrics = require("./getLyrics.js");

module.exports = async videoTitle => {
	const [id, imageUrl, lyricsUrl] = await confirmSong(videoTitle);

	return Promise.all([
		geniusRequest(`songs/${ id }`).then(data => data.song),
		getImageBuffer(imageUrl),
		getLyrics(lyricsUrl)
	]).then(results => {
		return {
			title: results[0].title,
			artist: results[0].primary_artist.name,
			album: results[0].album.name,
			year: results[0].release_date.substring(0, 4),
			performerInfo: results[0].album.artist.name,
			unsynchronisedLyrics: {
				language: "eng",
				text: results[2]
			},
			image: {
				imageBuffer: results[1],
				type: {
					id: 3
				}
			}
		};
	});
};
