"use client";
import ByStudentRequest from "@/component/BookRequest/ByStudent/ByStudentRequest";
import ByTeacherRequest from "@/component/BookRequest/ByTeacher/ByTeacherRequest";
import { Button } from "@mui/joy";
import React, { useState } from "react";

const RequestBooks = () => {
  const [open, setOpen] = useState(false);
  const handleCLick = () => {
    setOpen(true);
  };
  const handleClose=()=>{
    setOpen(false)
  }
  return (
    <>
      {open !== true ? (
        <>
          <Button onClick={handleCLick}>Student Request</Button>
        </>
      ) : (
        <>
          <Button onClick={handleClose}>Teacher Request</Button>
        </>
      )}
      {open === true ? (
        <>
          <ByStudentRequest />
        </>
      ) : (
        <>
          <ByTeacherRequest />
        </>
      )}
    </>
  );
};

export default RequestBooks;
