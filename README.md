# `txt2audio`

A small lib to convert text strings to audio files (mp3 & ogg) using Google Text to Speech api.

<img src="https://img.shields.io/github/package-json/v/gustavocardoso/txt2audio?style=flat-square"> <img src="https://img.shields.io/github/license/gustavocardoso/txt2audio?style=flat-square" alt="License: MIT">

It uses:

- [Node.js](https://nodejs.org/)
- [Google Text to Speech Api](https://cloud.google.com/text-to-speech)
- [MP3](https://en.wikipedia.org/wiki/MP3)
- [Ogg Vorbis](https://xiph.org/vorbis/)

**Important!**

To use Google Text to Speech Api you should, first, enable the api and set up an authentication method. You can read more [here](https://cloud.google.com/text-to-speech/docs/quickstart-client-libraries).

## Installation

```bash
npm install txt2audio
```

## How to use it

```javascript
const Txt2Audio = require("txt2audio");
```

Then you should declare an object with the options you need.

```javascript
const path = require("path");

let txt2audio = Txt2Audio({
  text: "Fuck corona virus",
  filename: "fck-corona",
  path: path.resolve(__dirname, "audio"),
  voicename: "en-US",
  gender: "female",
  ogg: true,
  debug: true
});
```

The **Txt2Audio** will return another function, **generateAudio**, which will generate the audio files and save them in the given path.

```javascript
txt2audio.generateAudio();
```

### Options

| Argument    | Type     | Default | Description                                      |
| ----------- | -------- | ------- | ------------------------------------------------ |
| `text`      | _string_ |         | text from which the audio file will be generated |
| `filename`  | _string_ |         | name of the generated file                       |
| `path`      | _string_ |         | folder where the file will be saved              |
| `voicename` | _string_ | en-US   | set the language for the api                     |
| `gender`    | _string_ | female  | male or female                                   |
| `ogg`       | _bool_   | false   | generate ogg version from the audio file         |
| `debug`     | _bool_   | false   | prints the request object in the terminal        |

_You can find a list of **voicename (language code)** and **gender** in the [Google Text to Speech Api documentation](https://cloud.google.com/text-to-speech/docs/voices)._

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/gustavocardoso/txt2audio/tags).

## Author

| ![Gustavo Cardoso](https://avatars1.githubusercontent.com/u/3013?s=150&v=4) |
| :-------------------------------------------------------------------------: |
|                [Gustavo Cardoso](https://gustavocardoso.me/)                |

See also the list of [contributors](https://github.com/gustavocardoso/txt2audio/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
