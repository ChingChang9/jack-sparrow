# Jack Sparrow
[![npm version](https://img.shields.io/npm/v/@chingchang9/jack-sparrow)](https://www.npmjs.com/package/@chingchang9/jack-sparrow)
[![npm total downloads](https://img.shields.io/npm/dt/@chingchang9/jack-sparrow)](https://www.npmjs.com/package/@chingchang9/jack-sparrow)
[![code size](https://img.shields.io/github/languages/code-size/ChingChang9/jack-sparrow)](https://github.com/ChingChang9/jack-sparrow)

Download MP3s from Youtube and autofill the lyrics, artist, cover art, and
other song info.

## Installation
```bash
npm install @chingchang9/jack-sparrow
mkdir jack-sparrow/tortuga
```

## Example usage
```bash
node . https://www.youtube.com/watch?v=md7dK5-qvHc
```
The program will then log the song title and artist.
Simply hit enter if the information is correct, or type "n" otherwise.
The output MP3 will be in `./tortuga`.
