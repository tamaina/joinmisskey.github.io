// クライアント挿入用
// falibs.jsも更新すること

import { icon, Icon, IconLookup, IconParams, library } from "@fortawesome/fontawesome-svg-core"

import {
  faDiscord,
  faGithub,
  faTwitter
} from "@fortawesome/free-brands-svg-icons"
library.add(
  faTwitter,
  faGithub,
  faDiscord
)

import {
  faBars,
  faBell,
  faBook,
  faBroadcastTower,
  faClock,
  faComments,
  faCube,
  faEnvelopeSquare,
  faExternalLinkAlt,
  faExternalLinkSquareAlt,
  faFolderOpen,
  faHdd,
  faHome,
  faICursor,
  faLock,
  faLockOpen,
  faPencilAlt,
  faRss,
  faSearch,
  faServer,
  faShieldAlt,
  faStoreAlt,
  faTags,
  faUserCog,
  faUsers
} from "@fortawesome/free-solid-svg-icons"
library.add(
  faBars,
  faBell,
  faBook,
  faBroadcastTower,
  faClock,
  faComments,
  faCube,
  faEnvelopeSquare,
  faExternalLinkAlt,
  faExternalLinkSquareAlt,
  faFolderOpen,
  faHdd,
  faHome,
  faICursor,
  faLock,
  faLockOpen,
  faPencilAlt,
  faRss,
  faSearch,
  faServer,
  faShieldAlt,
  faStoreAlt,
  faTags,
  faUserCog,
  faUsers
)

export const getHTML = (query: IconLookup, option: IconParams): string => {
  return icon(query, option).html[0]
}
export const getNode = (query: IconLookup, option: IconParams): HTMLCollection => {
  return icon(query, option).node
}

export const getIcon = (query: IconLookup, option: IconParams): Icon => {
  return icon(query, option)
}
