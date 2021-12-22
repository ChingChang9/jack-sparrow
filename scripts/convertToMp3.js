const { downloadFromInfo } = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");

module.exports = videoInfo => {
	return new Promise(resolve => {
		const audio = downloadFromInfo(videoInfo, {
			quality: "highestaudio",
			filter: "audioonly"
		});

		ffmpeg(audio)
			.audioCodec("libmp3lame")
			.audioBitrate(128)
			.save(`./tortuga/${ videoInfo.videoDetails.title.replace("/", "|") }.mp3`)
			.on("end", resolve);
	});
};
