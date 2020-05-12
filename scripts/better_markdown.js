/* eslint-disable camelcase */
const path = require("path")
const cheerio = require("cheerio")
const fontawesome = require("@fortawesome/fontawesome-svg-core")
fontawesome.library.add(require("@fortawesome/free-solid-svg-icons").fas, require("@fortawesome/free-regular-svg-icons").far, require("@fortawesome/free-brands-svg-icons").fab)
const punycode = require("punycode")

module.exports = (htm, urlprefix, image_compressing_strategy_version) => {
  const suf = `?v=${image_compressing_strategy_version}`
  /*
  function fuckescape(val){
    val = val.replace(/&amp;/g, "&")
             .replace(/&lt;/g, "<")
             .replace(/&gt;/g, ">")
             .replace(/&#39;/g, "'")
             .replace(/&quot;/g, "\"")
    val = val.replace(/&lt;/g, "<")
             .replace(/&gt;/g, ">")
             .replace(/&#39;/g, "'")
             .replace(/&quot;/g, "\"")
    return val
  } */

  const $ = cheerio.load(htm, { decodeEntities: false })

  $("body > h2, body > h3, body > h4, body > h5, body > h6").addClass("blogstyle")
  const hs = []
  $("h2, h3, h4, h5, h6").each((i, el) => { hs.push(encodeURIComponent($(el).text())) })
  $("h2, h3, h4, h5, h6").each(i => {
    const $els = $("h2, h3, h4, h5, h6")
    $els.eq(i).attr("id", hs[i])
  })

  let insertAdNumber = 6
  const adTag = `<ins class="adsbygoogle my-4" style="display:block; text-align:left;" data-ad-layout="in-article" data-ad-format="fluid" data-ad-client="ca-pub-1736621122676736" data-ad-slot="9247410221"></ins>`

  $("body > *").each(i => {
    const $els = $("body > *")
    insertAdNumber += 1

    if ($els.length - (i + 1) >= 6 && insertAdNumber > 17) {
      const tagName = $els.eq(i).get(0).tagName
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr'].includes(tagName)) {
        $els.eq(i).before(adTag)
        insertAdNumber = 0
      } else if (['table', 'ol', 'ul'].includes(tagName)) {
        $els.eq(i).after(adTag)
        insertAdNumber = 1
      }
    }
  })

  $("img").attr("loading", "lazy")
  $("img:not(.notblogstyle)").each((i, el) => {
    const img = (() => {
      const imgurl = (() => {
        if ($(el).is("img[src^=\"/\"]")) return $(el).attr("src")
        if ($(el).is("img[src^=\"files/\"]")) return `/${$(el).attr("src")}`
        return null
      })()
      if (imgurl && imgurl.match("png$|jpg$|jpeg$|gif$|webp$".replace("?", "\\?"))) {
        const iu = path.parse(imgurl)
        const sizes = "calc(100vw - 30px), (min-width: 576px) 510px, (min-width: 768px) 40em"
        return `<picture><source srcset="${urlprefix}${iu.dir}/${iu.name}.360.webp${suf} 360w, ${urlprefix}${iu.dir}/${iu.name}.720.webp${suf} 720w, ${urlprefix}${iu.dir}/${iu.name}.webp${suf} 1200w" type="image/webp" sizes="${sizes}"><source srcset="${urlprefix}${iu.dir}/${iu.name}.360${iu.ext}${suf} 360w, ${urlprefix}${iu.dir}/${iu.name}.720${iu.ext}${suf} 720w, ${urlprefix}${iu.dir}/${iu.base}${suf} 1200w" sizes="${sizes}">${$.html($(el))}</picture>`
      }
      $(el).attr("src", `${$(el).attr("src")}${suf}`)
      return $.html($(el))
    })()
    const tit = $(el).attr("title")
    const str = `<div class="blogstyle blogstyle-image"><div>${img}${tit && tit.length > 0 ? `<p>${tit}</p>` : ""}</div></div>`
    $(el).after(str)
    $(el).remove()
  })
  $("img[src^=\"/\"]").each((i, el) => { $(el).attr("src", `${urlprefix}${$(el).attr("src")}`) })
  $("img[src^=\"files/\"]").each((i, el) => { $(el).attr("src", `${urlprefix}/${$(el).attr("src")}`) })
  $("table").addClass("table table-sm table-bordered")
  $(":not([data-mfm]) > blockquote").addClass("blockquote rounded px-3 px-md-4 py-3 font-weight-light")
  $(":not([data-mfm]) > a[href^=\"http\"], :not([data-mfm]) > a[href^=\"//\"]").append(String.raw`<i class="fa fas external-link-alt" data-fa-prefix="fas" data-fa-icon-name="external-link-alt" data-fa-option="{'classes':['fa-fw', 'fa-sm']}"></i>`)
  const as = []
  $("a[href^=\"http\"], a[href^=\"//\"]").each((i, el) => { as.push($(el).text()) })
  $("a[href^=\"http\"], a[href^=\"//\"]").each(i => {
    const e = $("a[href^=\"http\"], a[href^=\"//\"]").eq(i)
    const text = as[i]
    e.attr({ target: "_blank", rel: "noopener" })
    if (e.attr("href") === text) e.text(decodeURIComponent(punycode.toUnicode(text)))
  })

  return $("body").html()
}
