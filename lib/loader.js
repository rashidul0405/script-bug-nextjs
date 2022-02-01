import memoize from "memoize-one"

/**
 * WARNING: Use this method directly to avoid memoization cache
 * @param key
 * @param {string} src - URL of script to lazy-load
 * @param async
 */
export const load = (key, src, async = false) =>
  new Promise((resolve, reject) => {
    let script = document.createElement("script")
    script.type = "text/javascript"
    // script.charset = 'utf-8'
    script.async = async

    // Handlers
    script.onload = resolve(key)
    script.onerror = reject
    script.onreadystatechange = () => {
      if (script.readyState === "loaded") {
        resolve(key)
      } else {
        reject()
      }
    }

    script.src = src
    document.body.appendChild(script)
  })

const cachedLoad = memoize(load)

/**
 * Use this to handle caching of script imports
 * @param key
 * @param {string} src - URL of script to lazy-load
 * @param {boolean} async
 * @param {boolean} [force] - Skip cached load
 */
const loader = (key, src, async, force = false) => {
  if (force) {
    return load(key, src, async)
  }
  return cachedLoad(key, src, async)
}

export default loader
