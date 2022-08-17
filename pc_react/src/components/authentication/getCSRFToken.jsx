import axios from 'axios'

export default function getCSRFToken () {
  let csrfToken
  const cookies = document.cookie.split(';')
  for (let cookie of cookies) {
    const crumbs = cookie.split('=')
    if (crumbs[0].trim() === 'csrftoken') {
      csrfToken = crumbs[1]
    }
  }
  return csrfToken
}