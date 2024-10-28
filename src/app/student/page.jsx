"use client";
import Form from "@/component/StudentForm/Form";
import StudentTable from "@/component/StudentForm/StudentTable";
import { successMsg } from "@/component/Toastmsg/toaster";
import UserContext from "@/context/UserContext";
import { Container } from "@mui/joy";
import { Box, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

const Student = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      fathername: "",
      mothername: "",
      class: "",
      section: "",
      rollno: "",
      gender: "",
      dob: new Date(),
      address: "",
    },
  });

  const { studentData, setStudentData } = useContext(UserContext);
  const [editIndex, setEditIndex] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [update, setUpdate] = useState(false);
  const onSubmit = (formData) => {
    try {
      const storedData =
        editIndex !== null
          ? studentData.map((item, index) =>
              index === editIndex ? formData : item
            )
          : [...studentData, formData];
      setEditIndex(null);
      setStudentData(storedData);
      reset();
      setOpenForm(false);
    } catch (error) {}
  };
  const handleDelete = (index) => {
    const updatedData = studentData.filter((_, i) => i !== index);
    setStudentData(updatedData);
    successMsg("Transaction deleted successfully");
  };
  const handleEdit = (index) => {
    setEditIndex(index);
    reset(studentData[index]);
    setOpenForm(true);
    setUpdate(true);
    successMsg("Transaction edited successfully");
  };
  const handleOpen = () => {
    setOpenForm(true);
    setUpdate(false);
    reset({
      name: "",
      fathername: "",
      mothername: "",
      class: "",
      section: "",
      rollno: "",
      gender: "",
      dob: new Date(),
      address: "",
    });
  };
  const handleClose = () => {
    setOpenForm(false);
  };
  return (
    <>
      <Container>
        <div className="grid justify-items-end ">
          {openForm === true ? (
            <></>
          ) : (
            <>
              {" "}
              <Button
                onClick={handleOpen}
                className="btn mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Add Student{" "}
              </Button>
            </>
          )}{" "}
        </div>
        {openForm === true ? (
          <>
            {" "}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Form
                control={control}
                update={update}
                handleClose={handleClose}
              />
            </form>
          </>
        ) : (
          <>
            {" "}
            <StudentTable
              studentData={studentData}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </>
        )}

        <br />
      </Container>
    </>
  );
};

export default Student;
