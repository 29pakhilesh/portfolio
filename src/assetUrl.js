/** Prefix public asset paths for GitHub Pages (/portfolio/) and local dev (/) */
export function assetUrl(path) {
  const clean = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${clean}`
}
