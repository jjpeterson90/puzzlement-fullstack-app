import axios from 'axios'

export function save_data(data) {
  axios.post('/save', data).then(response => {
    console.log('data saved: ', response)
  })
}

export async function test_load_save_data() {
  const data = await axios.get('/loadsave').then(response => {
      console.log('test response: ', response.data[0].fields)
      return response.data[0].fields
  })
}