import axios from 'axios'

// SAVE SCORES

export async function Riddle_Score_Save(data) {
  const response = await axios.post('/riddle/score/save', data).catch(resp => {
    console.log('score save failed')
  })
  if (response.data['success']) {
    console.log('win data saved')
  } else {
    console.log('win data failed to save')
  }
}

export async function Imgslider_Score_Save(data) {
  const response = await axios.post('/imgslider/score/save', data).catch(resp => {
    console.log('score save failed')
  })
  if (response.data['success']) {
    console.log('win data saved')
  } else {
    console.log('win data failed to save')
  }
}

export async function Tileflip_Score_Save(data) {
  const response = await axios.post('/tileflip/score/save', data).catch(resp => {
    console.log('score save failed')
  })
  if (response.data['success']) {
    console.log('win data saved')
  } else {
    console.log('win data failed to save')
  }
}

// LOAD SCORES

export async function Riddle_Scores() {
  const response = await axios.get('/riddle/scores').catch(resp => {
    console.log('failed to retrieve riddle scores')
  })
  return response
}

export async function Imgslider_Scores() {
  const response = await axios.get('/imgslider/scores').catch(resp => {
    console.log('failed to retrieve imgslider scores')
  })
  return response
}