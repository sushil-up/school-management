"use client";
import ByTeacher from "@/component/BookRequest/ByTeacher/ByTeacher";
import UserContext from "@/context/UserContext";
import { Container } from "@mui/material";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const BookTeacher = () => {
    const { handleSubmit, control } = useForm();
    const {byteacher, setByTeacher}=useContext(UserContext)
    const id = uuidv4()
    const onSubmit = (data) => {
      const setId = { ...data, id }
      const storedData= [...byteacher,setId]
      setByTeacher(storedData)
    };
  return (
    <>
      <Container>

       <form onSubmit={handleSubmit(onSubmit)}>
        <ByTeacher control={control}/>
        </form>
      </Container>
    </>
  );
};

export default BookTeacher;
