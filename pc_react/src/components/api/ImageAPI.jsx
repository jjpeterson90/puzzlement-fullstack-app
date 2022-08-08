import axios from 'axios'

export const ImageAPI = async (size, imgID) => {
  if (imgID) {
    const url = await axios.get(`https://picsum.photos/id/${imgID}/${size}`).then(response => {
      return response.request.responseURL
    })
    return url
  } else {
    const url = await axios.get(`https://picsum.photos/${size}`).then(response => {
      return response.request.responseURL
    })
    return url
  }
}