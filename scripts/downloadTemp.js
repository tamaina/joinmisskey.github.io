const { promisify } = require("util")
const fs = require("fs")
const fetch = require("node-fetch")
const fileType = require("file-type")
const glob = require("glob")
const mkdirp = require("mkdirp")
const glog = require("fancy-log")
const sharp = require("sharp")
const getHash = require("./gethash")

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

module.exports = async (name, url, tempDir, alwaysReturn) => {
  const toPng = (buffer, ext) => Promise.all(
    [
      sharp(buffer)
        .toFormat("png")
        .toBuffer()
        .then(png => writeFile(`${tempDir}${name}.png`, png)),
      writeFile(`${tempDir}${name}.${ext}`, buffer)
    ]
  )


  mkdirp.sync(tempDir)
  const files = glob.sync(`${tempDir}${name}.{png,jpg,jpeg,gif,webp}`)
  if (files.length > 0) {
    // glog("Getting image: " + url)
    const request = await fetch(url,　{ encoding: null }).catch(() => false)
    const remote = await request.buffer()
    if (!remote) return false
    let { ext } = await fileType.fromBuffer(remote)
    const local = await readFile(`${tempDir}${name}.${ext}`).catch(() => false)
    if (!local) return false
    if (getHash(remote, "sha384", "binary", "base64") !== getHash(local, "sha384", "binary", "base64")) {
      if (["png", "jpg", "jpeg", "webp"].indexOf(ext) === -1) {
        await toPng(remote, ext)
        ext = "png"
      }
      await writeFile(`${tempDir}${name}.${ext}`, remote)
      return { name, ext, status: "renewed" }
    }
    if (alwaysReturn) return { name, ext, status: "unchanged" }
    return false
  }
  glog(`Getting new image: ${url}`)
  return fetch(url,　{ encoding: null }).then(request => request.buffer()).then(async data => {
    let { ext } = await fileType.fromBuffer(data)
    if (["png", "jpg", "jpeg", "webp"].indexOf(ext) === -1) {
      await toPng(data, ext)
      ext = "png"
    }
    await writeFile(`${tempDir}${name}.${ext}`, data)
    return { name, ext, status: "created" }
  }).catch(reason => {
    glog(`Cannot get the image: ${name}`, reason)
    return false
  })
}
