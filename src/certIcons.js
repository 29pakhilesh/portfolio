import { assetUrl } from './assetUrl'

const SIMPLE = 'https://cdn.simpleicons.org'

const LOCAL_LOGOS = {
  'AWS Cloud Practitioner': '/icons/aws.png',
}

export const issuerIconMap = {
  Udemy: { slug: 'udemy', color: 'A435F0' },
  'Cisco Networking Academy': { slug: 'cisco' },
  OnWingspan: { slug: 'googlecloud', color: '4285F4' },
}

export function getCertLogoUrl(certName, issuer) {
  if (LOCAL_LOGOS[certName]) return assetUrl(LOCAL_LOGOS[certName])
  if (certName?.includes('AWS')) return assetUrl(LOCAL_LOGOS['AWS Cloud Practitioner'])

  const config = issuerIconMap[issuer]
  if (!config) return null
  const path = config.color ? `${config.slug}/${config.color}` : config.slug
  return `${SIMPLE}/${path}`
}
