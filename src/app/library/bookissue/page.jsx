"use client";
import BookIssusestudent from "@/component/Library/BookIssuse/BookIssusestudent";
import BookIssuseteacher from "@/component/Library/BookIssuse/BookIssuseteacher";
import { Button } from "@mui/joy";
import React, { useState } from "react";

const BookIssue = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose=()=>{
    setOpen(false);
  }
  return (
    <>
      {open === false ? (
        <>
          <Button onClick={handleOpen}>Issue By Student</Button>
          <BookIssuseteacher />
        </>
      ) : (
        <>
          <Button onClick={handleClose}>Issue By Teacher</Button>
          <BookIssusestudent />
        </>
      )}
    </>
  );
};

export default BookIssue;
