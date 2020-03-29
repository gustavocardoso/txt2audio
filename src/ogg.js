const ffmpeg = require('fluent-ffmpeg')

const convertToOgg = async (fileName, path) => {
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

module.exports = convertToOgg
