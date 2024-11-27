"use client";
import UserContext from "@/context/UserContext";
import { Box, Modal } from "@mui/joy";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import EditClassRoutine from "./EditClassRoutine";
import { successMsg } from "../Toastmsg/toaster";
const ClassRoutineEdit = ({ handleClose, open, editindex,edit }) => {
  const { timeTable, setTimeTable } = useContext(UserContext);
  const { handleSubmit, control, reset } = useForm({});
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "snow",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    maxHeight: "80vh",
    overflowY: "auto",
  };
  useEffect(() => {
    if (editindex !== null) {
      reset(edit);
    }
  }, [editindex,edit,reset]);

  const onSubmit = (data) => {
    const updatedData = timeTable.map((item) =>
      item.id === editindex ? data : item
    );
    setTimeTable(updatedData);
    handleClose();
    reset();
    successMsg("The class schedule was updated successfully.");
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <EditClassRoutine control={control} />
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ClassRoutineEdit;
