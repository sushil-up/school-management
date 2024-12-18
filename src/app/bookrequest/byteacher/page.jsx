"use client";
import ByTeacher from "@/component/BookRequest/ByTeacher/ByTeacher";
import ByTeacherRequest from "@/component/BookRequest/ByTeacher/ByTeacherRequest";
import { successMsg } from "@/component/Toastmsg/toaster";
import { ByTeacherValidation } from "@/component/Validation/ByTeacherValidation";
import UserContext from "@/context/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/joy";
import { Container } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const BookTeacher = () => {
  const { handleSubmit, control, reset,formState:{errors} } = useForm({resolver:yupResolver(ByTeacherValidation)});
  const [open, setOpen] = useState(false);
  const { byteacher, setByTeacher } = useContext(UserContext);
  const id = uuidv4();
  const { data: session } = useSession();
  const email = session?.user?.email;
  const onSubmit = (data) => {
    const setId = { ...data, id, email };
    const storedData = [...byteacher, setId];
    setByTeacher(storedData);
    reset();
    successMsg("Book Request Send Successfully");
  };
  const handleClose = () => {
    setOpen(true);
  };
  const handleClick = () => {
    setOpen(false);
  };
  return (
    <>
      <Container>
        {open === false ? (
          <>
            <Button onClick={handleClose}>View Request</Button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ByTeacher control={control} errors={errors}/>
            </form>
          </>
        ) : (
          <>
            <Button onClick={handleClick}>Send New Request</Button>
            <ByTeacherRequest />
          </>
        )}
      </Container>
    </>
  );
};

export default BookTeacher;
