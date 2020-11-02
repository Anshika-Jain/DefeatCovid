import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ErrorModal = (props) => {
  return (
    <Modal show={!!props.error} onHide={props.onClear}>
      <Modal.Header>
        <Modal.Title>An Error Occurred!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.error}</p>
      </Modal.Body>
      <Modal.Footer>
        {" "}
        <Button variant="contained" color="secondary" onClick={props.onClear}>
          Okay
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
