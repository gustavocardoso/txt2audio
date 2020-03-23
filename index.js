const textToSpeech = require('@google-cloud/text-to-speech')
const fs = require('fs')
const util = require('util')
const report = require('yurnalist')
const ffmpeg = require('fluent-ffmpeg')

const client = new textToSpeech.TextToSpeechClient()

const convertAudioToOgg = async (fileName, path) => {
  return new Promise(async (resolve, reject) => {
    return ffmpeg()
      .input(`${path}/${fileName}.mp3`)
      .toFormat('ogg')
      .output(`${path}/${fileName}.ogg`)
      .on('end', resolve)
      .on('error', reject)
      .run()
  })
}

const text2Audio = options => {
  const text = options.text
  const fileName = options.fileName
  const path = options.path
  const convertToOgg = options.ogg
  const gender = options.gender.toUpperCase()
  const request = {
    input: { text },
    voice: { languageCode: 'en-US-Standard-C', ssmlGender: gender },
    audioConfig: { audioEncoding: 'MP3' }
  }

  if (options.debug) {
    report.inspect(options)
  }

  return {
    generateAudio: async () => {
      const spinner = report.activity()

      spinner.tick(`Fetching audio for: ${text}`)

      try {
        const [response] = await client.synthesizeSpeech(request)
        const writeFile = util.promisify(fs.writeFile)
        const fileNameMp3 = `${fileName}.mp3`

        await writeFile(
          `${path}/${fileNameMp3}`,
          response.audioContent,
          'binary'
        )

        if (convertToOgg) {
          spinner.tick(`Converting ${fileNameMp3} to ogg`)
          await convertAudioToOgg(fileName, path)
        }

        report.success(`mp3 and ogg files for: ${text}`)
      } catch (error) {
        report.error(error)
      }

      spinner.end()
    }
  }
}

module.exports = text2Audio
