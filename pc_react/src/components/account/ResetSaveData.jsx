import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



function ResetSaveData() {

  const [ show, setShow ] = useState(false);

  const handleShow = () => setShow(true); 
  const handleClose = () => setShow(false);


  const handleConfirm = () => {
    setShow(false)
    let success = handleReset()
    if (success) {
      let btn = document.getElementById('save-data-reset-button')
      btn.innerHTML = 'Successful Reset'
      btn.disabled = true
    }
  }

  async function handleReset() {
    const response = await axios.delete('/deletesave').catch(resp => {
      console.log('reset failed')
    })
    if (response.data['success']) {
      console.log('reset successful')
    } else {
      console.log('reset failed')
    }
    return response.data['success']
  }

  return (
    <>
      <Button onClick={handleShow} id="save-data-reset-button">
        Reset Save Data
      </Button>

      <Modal
        size = 'sm'
        centered
        show = {show}
        onHide = {handleClose}
        animation = {true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Reset Save Data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This process is not reversable.
          Are you sure?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ResetSaveData