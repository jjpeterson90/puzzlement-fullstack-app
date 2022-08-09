
export function save_data(data) {
  axios.post('/save', data).then(response => {
    console.log('data saved: ', response)
  })
}

