import { assetUrl } from './assetUrl'

const LOCAL_ISSUER_LOGOS = {
  Udemy: 'icons/udemy.svg',
  'Cisco Networking Academy': 'icons/cisco.svg',
  OnWingspan: 'icons/onwingspan.svg',
}

const LOCAL_CERT_LOGOS = {
  'AWS Cloud Practitioner': 'icons/aws.png',
}

export function getCertLogoUrl(certName, issuer) {
  if (LOCAL_CERT_LOGOS[certName]) return assetUrl(LOCAL_CERT_LOGOS[certName])
  if (certName?.includes('AWS')) return assetUrl(LOCAL_CERT_LOGOS['AWS Cloud Practitioner'])
  if (issuer && LOCAL_ISSUER_LOGOS[issuer]) return assetUrl(LOCAL_ISSUER_LOGOS[issuer])
  return null
}
