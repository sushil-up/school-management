"use client";
import BookIssusestudent from "@/component/Library/BookIssuse/BookIssusestudent";
import BookIssuseteacher from "@/component/Library/BookIssuse/BookIssuseteacher";
import { Button } from "@mui/joy";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const page = () => {
  const { handleSubmit, control } = useForm();
  const [ open, setOpen ] = useState(false);
  const onSubmit = (data) => {
    console.log("data", data);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Button onClick={handleOpen}>Issue By Student</Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        {open === false ? (
          <BookIssuseteacher control={control} />
        ) : (
          <BookIssusestudent control={control} />
        )}
      </form>
    </>
  );
};

export default page;
