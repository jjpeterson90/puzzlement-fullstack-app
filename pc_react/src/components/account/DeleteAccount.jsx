import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function DeleteAccount( {handleLogout} ) {

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true); 
  const handleClose = () => setShow(false);

  const handleConfirm = () => null;

  return (
    <>
      <Button onClick={handleShow}>
        Delete Account
      </Button>

      <Modal
        size = 'sm'
        centered
        show = {show}
        onHide = {handleClose}
        animation = {true}
      >
        <Modal.Header closeButton>
          <Modal.Title contentClassName='custom-modal'>
            Delete Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body contentClassName='custom-modal'>
          This process is not reversable.
          Are you sure?
        </Modal.Body>
        <Modal.Footer contentClassName='custom-modal'>
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

export default DeleteAccount