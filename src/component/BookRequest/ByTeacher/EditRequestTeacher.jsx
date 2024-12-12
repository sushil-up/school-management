"use client"
import { Box, Container, Modal } from "@mui/joy";
import React, { useContext, useEffect, useState } from "react";
import ByTeacher from "./ByTeacher";
import { useForm } from "react-hook-form";
import UserContext from "@/context/UserContext";
import { successMsg } from "@/component/Toastmsg/toaster";

const EditRequestTeacher = ({
  handleClose,
  open,
  editIndex,
  edit,
  setEditIndex,
  setOpen
}) => {
  const { byteacher, setByTeacher } = useContext(UserContext);
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
    const updatedData = byteacher?.map((item) =>
      item.id === editIndex ? formData : item
    );
    successMsg("Book Request have been updated successfully")
    setOpen(false)
    setByTeacher(updatedData);
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
              <ByTeacher control={control} edit={edit} />
            </form>
          </Box>
        </Modal>
      </Container>
    </>
  );
};
export default EditRequestTeacher;
