"use client";
import Form from "@/component/StudentForm/Form";
import StudentTable from "@/component/StudentForm/StudentTable";
import { successMsg } from "@/component/Toastmsg/toaster";
import { StudentValidation } from "@/component/Validation/StudentValidation";
import UserContext from "@/context/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container } from "@mui/joy";
import {  Button } from "@mui/material";
import React, { useContext,  useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
const Student = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(StudentValidation),
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
  const id= uuidv4()
  const onSubmit = (formData) => {
    const setid = {...formData,id}
    try {
      const storedData =
        editIndex !== null
          ? studentData?.map((item, index) =>
              item.id === editIndex ? formData : item
            )
          : [...studentData, setid];
      setEditIndex(null);
      editIndex !== null
        ? successMsg("Student information has been successfully edited.")
        : successMsg("Student record created successfully.");
      setStudentData(storedData);
      reset();
      setOpenForm(false);
    } catch (error) {}
  };
  const handleDelete = (item) => {
    const updatedData = studentData?.filter((del, i) =>del.id !== item.id);
    setStudentData(updatedData);
    successMsg("Student deleted successfully");
  };
  const handleEdit = (item) => {
    setEditIndex(item.id);
    reset(item);
    setOpenForm(true);
    setUpdate(true);
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
                errors={errors}
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
