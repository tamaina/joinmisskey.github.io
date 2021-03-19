/* eslint-disable max-len */
const mkConnectServices = ["Twitter", "GitHub", "Discord"]

const { promisify } = require("util")
const sass = require("sass")
const CleanCss = require("clean-css")
const htmlToText = require("html-to-text")
const fetch = require("node-fetch").default
const mkdirp = require("mkdirp")
const extend = require("extend")
const semver = require("semver")
const glog = require("fancy-log")
const colors = require("colors")
const glob = require("glob")
const path = require("path")
const AbortController = require("abort-controller").default

const fontawesome = require("@fortawesome/fontawesome-svg-core")
const downloadTemp = require("../../downloadTemp")
fontawesome.library.add(require("@fortawesome/free-solid-svg-icons").fas, require("@fortawesome/free-regular-svg-icons").far, require("@fortawesome/free-brands-svg-icons").fab)

async function getContributors(keys) {
  try {
    const res = await fetch(
      "https://api.github.com/repos/syuilo/misskey/contributors",
      {
        headers: {
          "User-Agent": "LuckyBeast",
          Authorization: `bearer ${keys.github.bearer}`
        }
      }
    )
    return res.json()
  } catch (e) {
    glog("Cannot get GitHub contributors")
    glog(e)
    return null
  }
}

async function getPatrons(patreonUrl, keys) {
  try {
    return fetch(patreonUrl, { headers: { Authorization: `Bearer ${keys.patreon.bearer}` } }).then(res => res.json())
  } catch (e) {
    glog("Cannot get Patreon patrons")
    glog(e)
    return null
  }
}

async function getAmpCss() {
  let ampcss = ""
  try {
    ampcss += "/*Based on Bootstrap v4.1.3 (https://getbootstrap.com)|Copyright 2011-2018 The Bootstrap Authors|Copyright 2011-2018 Twitter, Inc.|Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)*/\n"
    ampcss += (await promisify(sass.render)({ file: "theme/styl/amp/amp_main.sass" })).css.toString()
    ampcss += "\n"
    ampcss += fontawesome.dom.css()
    ampcss += "\n"
    ampcss = new CleanCss().minify(ampcss).styles.replace(/!important/g, "").replace(/@charset "UTF-8";/g, "").replace(/@-ms-viewport{width:device-width}/g, "")

    glog(`making amp css: ${Buffer.byteLength(ampcss)}Byte`)
  } catch (e) {
    glog(colors.red("making amp css failed"))
    glog(colors.red(e))
    ampcss = "/* oops */"
  }
  return ampcss
}

function safePost(url, options) {
  const controller = new AbortController()
  const timeout = setTimeout(
    () => { controller.abort() },
    600000
  )
  // glog("POST start", url)
  return fetch(url, extend(true, options, { method: "POST", signal: controller.signal })).then(
    res => {
      // glog("POST finish", url)
      if (res && res.status === 200) return res
      return false
    },
    e => {
      // glog("POST failed", url, e.errno, e.type)
      return false
    }
  ).finally(() => {
    clearTimeout(timeout)
  })
}

async function postJson(url, json) {
  return safePost(url, (json ? {
    body: JSON.stringify(json),
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "LuckyBeast"
    }
  } : {
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "LuckyBeast"
    }
  }))
    .then(res => ((res && res.ok)? res.json() : false))
    .catch(e => {
      glog.error(url, e)
      return false
    })
}

async function getVersions(keys) {
  glog("Getting Misskey Versions")
  const ghRepos = ["mei23/misskey", "Groundpolis/Groundpolis", "346design/twista.283.cloud", "syuilo/misskey"]
  const maxRegExp = /<https:\/\/.*?>; rel="next", <https:\/\/.*?\?page=(\d+)>; rel="last"/
  const versions = {}
  const headers = {
    "User-Agent": "LuckyBeast",
    Authorization: `bearer ${keys.github.bearer}`
  }

  await Promise.all(ghRepos.map(async repo => {
    glog(repo, "Start")
    const res1 = await fetch(`https://api.github.com/repos/${repo}/releases`, { headers })
    const link = res1.headers.get("link")
    const max = link && Math.min(Number(maxRegExp.exec(link)[1]), repo === "syuilo/misskey" ? 99999 : 3)

    const resp = (await Promise.all([Promise.resolve(res1), ...(!link ? []
      : Array(max - 1).fill()
        .map((v, i) => `https://api.github.com/repos/${repo}/releases?page=${i + 2}`)
        .map(url => fetch(url, { headers })))]
      .map((resa, i) => resa.then(
        res => res.json(),
        e => {
          glog(repo, "Error(fetch)", e)
          Promise.resolve([])
        }
      ).then(
        json => json.map((release, j) => {
          // glog("Misskey Version", release.tag_name)
          versions[semver.clean(release.tag_name, { loose: true })] = (i - 1) * 30 + j
          return release.tag_name
        }),
        e => {
          glog(repo, "Error(json)", e)
          Promise.resolve([])
        }
      ).catch(e => { throw Error(e) })))).flat(1)
    glog(repo, "Finish", resp.length)
  }))

  glog("Got Misskey Versions")
  return versions
}

async function getInstancesInfos(instances, keys) {
  glog("Getting Instances' Infos")

  const metasPromises = []
  const statsPromises = []
  const AUChartsPromises = []
  const instancesInfos = []

  const versionsPromise = getVersions(keys)
  // const queue = new Queue(8)
  // eslint-disable-next-line no-restricted-syntax
  for (let t = 0; t < instances.length; t += 1) {
    const instance = instances[t]
    metasPromises.push(postJson(`https://${instance.url}/api/meta`))
    statsPromises.push(postJson(`https://${instance.url}/api/stats`))
    AUChartsPromises.push(postJson(`https://${instance.url}/api/charts/active-users`, { span: "day" }))
  }
  const [
    metas,
    stats,
    AUCharts,
    versions
  ] = await Promise.all([
    Promise.all(metasPromises),
    Promise.all(statsPromises),
    Promise.all(AUChartsPromises),
    versionsPromise
  ])

  for (let i = 0; i < instances.length; i += 1) {
    const instance = instances[i]
    const meta = metas[i] || false
    const stat = stats[i] || false
    const AUChart = AUCharts[i] || false
    if (meta && stat && AUChart && Array.isArray(AUChart)) {
      delete meta.emojis

      /*   インスタンスバリューの算出   */
      let value = 0
      // 1. バージョンのリリース順をもとに並び替え
      const v = versions[semver.clean(meta.version, { loose: true })] || versions[semver.valid(semver.coerce(meta.version))] || 999
      value += 100000 - v * 7200
      // (基準値に影響があるかないか程度に色々な値を考慮する)
      if (AUChart) {
        // 2.
        const arr = AUChart.local.count.filter(e => e !== 0)
        // eslint-disable-next-line no-mixed-operators
        if (arr.length > 0) value += arr.reduce((prev, current) => prev + current) / arr.length * 10
      }

      // 4.
      value += stat.originalNotesCount > 0 ? Math.log10(stat.originalNotesCount) * 7 : 0
      // 5.
      value += stat.originalUsersCount > 0 ? Math.log2(stat.originalUsersCount) * 1 : 0
      // 6.
      value += meta.driveCapacityPerLocalUserMb > 0 ? Math.log10(meta.driveCapacityPerLocalUserMb) * 10 : 0

      // 7.
      if (meta.features) {
        if (meta.features.recaptcha || meta.features.hcaptcha) value += 3600
        let v2 = 0
        // eslint-disable-next-line no-restricted-syntax
        for (let t = 0; t < mkConnectServices.length; t += 1) {
          const service = mkConnectServices[t]
          if (meta.features[service.toLowerCase()]) { v2 += 500 }
        }
        if (v2 > 0) value += v2 + 500
        if (meta.features.serviceWorker) value += 3600
      }

      instancesInfos.push(extend(true, instance, {
        value,
        meta,
        stats: stat,
        description: meta.description ? htmlToText.fromString(meta.description).replace(/\n/g, "<br>") : (instance.description || null),
        isAlive: true
      }))
    } else {
      instancesInfos.push(extend(true, { isAlive: false, value: 0 }, instance))
    }
  }
  glog("Got Instances' Infos")
  return instancesInfos.sort((a, b) => {
    if (!a.isAlive && b.isAlive) return 1
    if (a.isAlive && !b.isAlive) return -1
    if (a.isAlive && b.isAlive) return (b.value || 0) - (a.value || 0)
    return (b.url > a.url ? -1 : 1)
  })
}

module.exports = async (site, keys, tempDir, instances) => {
  const creditIconsPromises = []

  await mkdirp(`${tempDir}github/`)

  /* get contrbutors from GitHub API */
  const contributors = await getContributors(keys)

  // eslint-disable-next-line no-restricted-syntax
  for (let t = 0; t < contributors.length; t += 1) {
    const contributor = contributors[t]
    creditIconsPromises.push(downloadTemp(`github/${contributor.id}`, contributor.avatar_url, tempDir))
  }
  glog("Got contributors from GitHub")

  /* get patrons from Patreon API */

  await mkdirp(`${tempDir}patreon/`)

  let patrons = null
  if (keys != null && keys.patreon) {
    patrons = []
    patrons.push(
      {
        title: "the Others",
        titles: site.i18n.the_other_backers,
        amountCents: 0,
        members: []
      }
    )

    let patreonUrl = `https://www.patreon.com/api/oauth2/v2/campaigns/${keys.patreon.campaign}/members?include=currently_entitled_tiers,user&fields%5Bmember%5D=currently_entitled_amount_cents&fields%5Btier%5D=amount_cents,title&fields%5Buser%5D=full_name,thumb_url,url,hide_pledges`
    while (patreonUrl) {
      // eslint-disable-next-line no-await-in-loop
      const n = await getPatrons(patreonUrl, keys)

      if (n) {
        for (let t = 0; t < n.data.length; t += 1) {
          const e = n.data[t]
          // eslint-disable-next-line no-continue
          if (e.attributes.currently_entitled_amount_cents === 0) continue

          const cet = e.relationships.currently_entitled_tiers

          const member = n.included.find(g => g.id === e.relationships.user.data.id && g.type === "user")
          member.currently_entitled_amount_cents = e.attributes.currently_entitled_amount_cents

          if (cet.data.length > 0) {
            // eslint-disable-next-line no-underscore-dangle
            const _tier = n.included.find(g => g.id === cet.data[0].id && g.type === "tier")

            const tier = patrons.find(f => f.id === _tier.id)
            if (!tier) {
              patrons.push({
                title: _tier.attributes.title,
                id: _tier.id,
                amountCents: _tier.attributes.amount_cents,
                members: [member]
              })
            } else {
              tier.members.push(member)
            }
          } else {
            patrons[0].members.push(member)
          }
        }
        if (n.links) patreonUrl = n.links.next; else patreonUrl = null
      } else {
        patreonUrl = null
      }
    }

    patrons.sort((a, b) => b.amountCents - a.amountCents)

    glog("Got patrons from Patreon")
    for (let m = 0; m < patrons.length; m += 1) {
      const tier = patrons[m]
      for (let n = 0; n < tier.members.length; n += 1) {
        const member = tier.members[n]
        // console.log(member)
        creditIconsPromises.push(downloadTemp(`patreon/${member.id}`, member.attributes.thumb_url, tempDir))
      }
      tier.members.sort((a, b) => b.lifetime_support_cents - a.lifetime_support_cents)
    }
  }

  await mkdirp(`${tempDir}instance-banners/`)
  const instancesInfos = await getInstancesInfos(instances, keys)

  const instancesBannersPromises = instancesInfos
    .filter(instance => instance.isAlive && instance.meta.bannerUrl)
    .map(instance => downloadTemp(`${instance.url}`, instance.meta.bannerUrl, `${tempDir}instance-banners/`, true))

  const stats = instancesInfos.reduce((prev, v) => {
    if (!v.isAlive) return prev

    return {
      notesCount: v.stats.originalNotesCount + prev.notesCount,
      usersCount: v.stats.originalUsersCount + prev.usersCount,
      instancesCount: 1 + prev.instancesCount
    }
  }, { notesCount: 0, usersCount: 0, instancesCount: 0 })

  const [creditIcons, instancesBanners, ampcss] = await Promise.all([
    Promise.all(creditIconsPromises),
    Promise.all(instancesBannersPromises),
    getAmpCss()
  ])

  return {
    instancesInfos,
    patrons,
    contributors,
    ampcss,
    creditIcons,
    mkConnectServices,
    instancesBanners,
    stats,
    baseStyles: (await promisify(glob)("theme/styl/*.s[ac]ss")).map(p => path.parse(p).name),
    lazyStyles: (await promisify(glob)("theme/styl/lazy/*.s[ac]ss")).map(p => path.parse(p).name)
  }
}
