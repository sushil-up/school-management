"use client";

import Form from "@/component/TeacherForm/Form";
import TeacherTable from "@/component/TeacherForm/TeacherTable";
import { TeacherValidation } from "@/component/Validation/TecherValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container } from "@mui/joy";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useLocalStorage from "use-local-storage";
const Teacher = () => {
  const { control, handleSubmit, reset,formState:{errors} } = useForm({resolver:yupResolver(TeacherValidation),
    defaultValues: {
      name: "",
      class: "",
      gender: "",
      dob: new Date(),
      address: "",
    },
  });
  const [teacherData, setTeacherData] = useLocalStorage("teacher", []);
  const [editIndex, setEditIndex] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [update, setUpdate] = useState(false);
  const onSubmit = (formData) => {
    try {
      const storedData =
        editIndex !== null
          ? teacherData.map((item, index) =>
              index === editIndex ? formData : item
            )
          : [...teacherData, formData];
      setTeacherData(storedData);
      reset();
      setOpenForm(false);
    } catch (error) {}
  };
  const handleDelete = (index) => {
    const updatedData = teacherData.filter((_, i) => i !== index);
    setTeacherData(updatedData);
  };
  const handleEdit = (index) => {
    setEditIndex(index);
    reset(teacherData[index]);
    setOpenForm(true);
    setUpdate(true);
  };
  const handleOpen = () => {
    setOpenForm(true);
    setUpdate(false);
    reset({
      name: "",
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
        <div className="grid justify-items-end">
          {openForm === true ? (
            <></>
          ) : (
            <>
              {" "}
              <Button
                onClick={handleOpen}
                className="btn mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 
            "
              >
                Add Teacher
              </Button>
            </>
          )}{" "}
        </div>
        {openForm === true ? (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Form
                control={control}
                update={update}
                handleClose={handleClose}
                errors={errors}
              />
            </form>
          </>
        ) : (
          <>
            <TeacherTable
              teacherData={teacherData}
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

export default Teacher;
