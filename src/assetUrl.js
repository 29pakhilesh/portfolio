export function assetUrl(path) {
  const clean = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${clean}`
}
