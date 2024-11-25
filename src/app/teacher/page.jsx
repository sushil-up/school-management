"use client";

import DeleteModal from "@/component/Modal/DeleteModal";
import Form from "@/component/TeacherForm/Form";
import TeacherTable from "@/component/TeacherForm/TeacherTable";
import { successMsg } from "@/component/Toastmsg/toaster";
import { TeacherValidation } from "@/component/Validation/TecherValidation";
import UserContext from "@/context/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container } from "@mui/joy";
import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
const Teacher = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TeacherValidation),
    defaultValues: {
      name: "",
      class: "",
      gender: "",
      dob: new Date(),
      address: "",
    },
  });
  const { teacherData, setTeacherData } = useContext(UserContext);
  const [editIndex, setEditIndex] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [deleteOpenModal,setDeleteOpenModal]=useState(false)
  const [update, setUpdate] = useState(false);
  const [deleteIndex,setDeleteIndex]=useState()
  const id = uuidv4()
  const onSubmit = (formData) => {
    const setId= {...formData,id}
    try {
      const storedData =
        editIndex !== null
          ? teacherData.map((item) =>
              item.id === editIndex ? formData : item
            )
          : [...teacherData, setId];
          editIndex !== null
          ? successMsg("Teacher information has been successfully edited.")
          : successMsg("Teacher record created successfully.");
      setTeacherData(storedData);
      setEditIndex(null)
      reset();
      setOpenForm(false);
    } catch (error) {}
  };
  const onDelete=()=>{
    const updatedData = teacherData.filter((item, i) => item.id !== deleteIndex);
    setTeacherData(updatedData);
    setDeleteOpenModal(false)
    successMsg("Teacher information has been successfully deleted.")
  }
  const handleDelete = (item) => {
  setDeleteIndex(item.id)
    setDeleteOpenModal(true)
  };
  const deleteHandleModalClose=()=>{
    setDeleteOpenModal(false)
  }
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
      <DeleteModal
         onDelete={onDelete}
         deleteMessage="Are you certain you want to proceed with this deletion?"
         deleteOpenModal={deleteOpenModal}
         deleteHandleModalClose={deleteHandleModalClose}
      />
    </>
  );
};

export default Teacher;
