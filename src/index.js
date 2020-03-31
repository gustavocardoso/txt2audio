const textToSpeech = require('@google-cloud/text-to-speech')
const fs = require('fs')
const util = require('util')
const report = require('yurnalist')

const convertToOgg = require('./ogg')

const client = new textToSpeech.TextToSpeechClient()

const text2Audio = ({
  text,
  filename,
  path,
  ogg = false,
  languageCode = 'en-US',
  gender = 'female',
  debug = false
}) => {
  gender = gender.toUpperCase()
  const request = {
    input: { text },
    voice: { languageCode, ssmlGender: gender },
    audioConfig: { audioEncoding: 'MP3' }
  }

  if (debug) {
    report.warn('Debugging request object:')
    report.inspect(request)
  }

  return {
    generateAudio: async () => {
      const spinner = report.activity()

      spinner.tick(`Fetching audio for: ${text}`)

      try {
        const [response] = await client.synthesizeSpeech(request)
        const writeFile = util.promisify(fs.writeFile)
        const fileNameMp3 = `${filename}.mp3`

        await writeFile(
          `${path}/${fileNameMp3}`,
          response.audioContent,
          'binary'
        )

        if (ogg) {
          spinner.tick(`Converting ${fileNameMp3} to ogg`)
          await convertToOgg(filename, path)
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
