import window from "./window"

export const gaInstanceEvent = async (): Promise<void> => {
  for (const el of document.querySelectorAll("a.instance") as unknown as HTMLAnchorElement[]) {
    const href = el.href

    el.addEventListener("click", () => window.gtag("event", "instance", {
      event_category: "click",
      event_label: href,
      nonInteraction: true
    }))
    el.addEventListener("drop", () => window.gtag("event", "instance", {
      event_category: "drop",
      event_label: href,
      nonInteraction: true
    }))
    el.addEventListener("contextmenu", () => window.gtag("event", "instance", {
      event_category: "contextmenu",
      event_label: href
    }))
  }
}
