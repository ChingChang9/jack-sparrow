const { getInfo } = require("ytdl-core");
const NodeID3 = require("node-id3");
const getMetadata = require("./getMetadata.js");
const convertToMp3 = require("./convertToMp3.js");

module.exports = async videoUrl => {
	const videoInfo = await getInfo(videoUrl);

	Promise.all([
		getMetadata(videoInfo.videoDetails.title),
		convertToMp3(videoInfo)
	]).then(results => NodeID3.write(results[0], `./tortuga/${ videoInfo.videoDetails.title.replace("/", "|") }.mp3`));
};
