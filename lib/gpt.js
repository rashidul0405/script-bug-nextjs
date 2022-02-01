import loader from "./loader"

const defineAdSlot = (
  googletag,
  adUnitPath,
  adUnitDiv,
  viewport,
  sizeMapping
) => {
  try {
    const slot = googletag.defineSlot(adUnitPath, viewport, adUnitDiv)
    if (slot) {
      slot
        .defineSizeMapping(sizeMapping)
        .addService(googletag.pubads())
        .setCollapseEmptyDiv(true)
    }
  } catch (e) {
    console.log(e)
  }
}

const getGoogleTag = () => {
  window.googletag = window.googletag || {}
  window.googletag.cmd = window.googletag.cmd || []

  return loader(
    window.googletag,
    "https://securepubads.g.doubleclick.net/tag/js/gpt.js",
    true
  )
}

export const doRefresh = () => {
  try {
    getGoogleTag().then((googletag) => {
      googletag.cmd.push(function () {
        googletag.pubads().clear()
        googletag.pubads().refresh()
      })
    })
  } catch (e) {
    console.log(e)
  }
}

export const pushCmd = (
  adUnitPath,
  adUnitDiv,
  viewport,
  sizeMapping,
) => {
  try {
    getGoogleTag().then((googletag) => {
      googletag.cmd.push(() => {
        defineAdSlot(googletag, adUnitPath, adUnitDiv, viewport, sizeMapping)
        googletag.pubads().enableSingleRequest()
        // https://support.google.com/admanager/answer/3072674?hl=en - handled from defineSlot
        // googletag.pubads().collapseEmptyDivs()
        // googletag.pubads().disableInitialLoad()
        googletag.enableServices()

        googletag.pubads().enableLazyLoad({
          fetchMarginPercent: 500, // Fetch slots within 5 viewports.
          renderMarginPercent: 300, // Render slots within 2 viewports.
          mobileScaling: 2.0 // Double the above values on mobile.
        })

        // call display after defining roadblock slots
        googletag.display(adUnitDiv)
      })
    })
  } catch (e) {
    console.log(e)
  }
}
