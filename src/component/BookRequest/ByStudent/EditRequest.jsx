"use client"
import { Box, Container, Modal } from "@mui/joy";
import React, { useContext, useEffect } from "react";
import ByStudent from "./ByStudent";
import { useForm } from "react-hook-form";
import UserContext from "@/context/UserContext";
import { successMsg } from "@/component/Toastmsg/toaster";

const EditRequest = ({
  handleClose,
  open,
  editIndex,
  edit,
  setEditIndex,
  setOpen,
}) => {
  const { bystudent, setByStudent } = useContext(UserContext);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "snow",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    maxHeight: "80vh",
    overflowY: "auto",
  };
  const { handleSubmit, control, reset } = useForm();
  const onSubmit = (formData) => {
    const updatedData = bystudent?.map((item) =>
      item.id === editIndex ? formData : item
    );
    successMsg("Book Request have been updated successfully");
    setOpen(false);
    setByStudent(updatedData);
    setEditIndex(null);
  };
  useEffect(() => {
    if (open && editIndex !== null && edit) {
      reset(edit);
    } else {
      reset();
    }
  }, [open, editIndex, edit, reset]);
  return (
    <>
      <Container>
        <Modal open={open} onClose={handleClose}>
        <Box sx={style} classname="model-pop">
          <form onSubmit={handleSubmit(onSubmit)}>
            <ByStudent control={control} edit={edit} />
          </form>
          </Box>
        </Modal>
      </Container>
    </>
  );
};

export default EditRequest;
