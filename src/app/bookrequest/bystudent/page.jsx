"use client";
import ByStudent from "@/component/BookRequest/ByStudent/ByStudent";
import ByStudentRequest from "@/component/BookRequest/ByStudent/ByStudentRequest";
import { successMsg } from "@/component/Toastmsg/toaster";
import UserContext from "@/context/UserContext";
import { Button, Container } from "@mui/joy";
import { useSession } from "next-auth/react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
const BookStudent = () => {
  const { handleSubmit, control, reset } = useForm();
  const [open, setOpen] = useState(false);
  const { bystudent, setByStudent } = useContext(UserContext);
  const id = uuidv4();
  const { data: session } = useSession();
  const email = session?.user?.email;
  const onSubmit = (data) => {
    const setId = { ...data, id, email };
    const storedData = [...bystudent, setId];
    setByStudent(storedData);
    reset();
    successMsg("Book Request Send Successfully");
    setOpen(true);
  };
  const handleClick = () => {
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(true);
  };
  return (
    <>
      <Container>
        {open === false ? (
          <>
            <Button onClick={handleClose}>View Request</Button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ByStudent control={control} />
            </form>
          </>
        ) : (
          <>
            <Button onClick={handleClick}>Send New Request</Button>
            <ByStudentRequest />
          </>
        )}
      </Container>
    </>
  );
};

export default BookStudent;
