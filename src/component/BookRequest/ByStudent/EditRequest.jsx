import { Container, Modal } from "@mui/joy";
import React from "react";

const EditRequest = ({ handleClose, open }) => {
  return (
    <>
      <Container>
        <Modal open={open} onClose={handleClose}>

        </Modal>
      </Container>
    </>
  );
};

export default EditRequest;
