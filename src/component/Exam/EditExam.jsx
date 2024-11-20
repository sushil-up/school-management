"use client";
import React, { useContext, useEffect } from "react";
import { selectclass } from "../SelectClass";
import DateSelect from "../shared/form/DatePicker";
import { Box, Button, Modal, Typography } from "@mui/joy";
import FormInput from "../shared/form/TextField";
import FormInputSelect from "../shared/form/FormInputSelect";
import FormTimePicker from "../shared/form/TimePicker";
import { useForm } from "react-hook-form";
import UserContext from "@/context/UserContext";

const EditExam = ({ open, handleClose, edit, editIndex }) => {
    const { examination, setExamination } = useContext(UserContext);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
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
    if (editIndex !== null) {
      reset(edit);
    }
  }, [editIndex, edit,reset]);
  const onSubmit = (data) => {
    const updatedData = examination.map((item) =>
        item.id === editIndex ? data : item
      );
      setExamination(updatedData);
      handleClose();
      reset();
      successMsg("The exam schedule was successfully updated");
  };
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography>Update Exam</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInputSelect
              control={control}
              className="mt-4"
              name="exam_type"
              label="Select Exam Type"
              options={["Class Test", "Mid term", "Board Exam", "Anual Exam"]}
              errors={errors}
            />
            <FormInputSelect
              control={control}
              className="mt-4 "
              name="class"
              label="Select Class"
              options={selectclass}
              errors={errors}
            />
            <FormInputSelect
              control={control}
              className="mt-4"
              name="section"
              label="Select Section"
              options={["A", "B", "C"]}
              errors={errors}
            />
            <FormInput
              control={control}
              className="mt-4 "
              name="subject"
              label="Subject Name"
              placeholder="Subject Name"
              inputType="text"
              errors={errors}
            />
            <DateSelect
              className="mt-4 "
              control={control}
              name="examdate"
              label="Exam Date"
            />
            <FormTimePicker
              control={control}
              lable="Exam Time"
              name="exam_time"
              className="mt-2"
              errors={errors}
            />
            <br />
            <Button
              className="mt-4 ml-2 bg-red-500 hover:bg-red-600"
              type="submit"
            >
              Update
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default EditExam;
