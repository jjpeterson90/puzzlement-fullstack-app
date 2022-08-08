import axios from 'axios'

export const ImageAPI = async (size) => {
  const url = await axios.get(`https://picsum.photos/${size}`).then(response => {
    return response.request.responseURL
  })
  return url
}