"use client";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import UserContext from "@/context/UserContext";
import AddBooks from "@/component/Library/AddBooks";
import AllBook from "@/component/Library/AllBook";
import { successMsg } from "@/component/Toastmsg/toaster";
import { Button } from "@mui/joy";
import { v4 as uuidv4 } from "uuid";
import { yupResolver } from "@hookform/resolvers/yup";
import { LibraryValidation } from "@/component/Validation/LibraryValidation";

const Libraray = () => {
  const { libraryrecord, setLibraryRecord } = useContext(UserContext);
  const { handleSubmit, control, reset,formState:{errors} } = useForm({resolver:yupResolver(LibraryValidation)});
  const [open, setopen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const id = uuidv4();
  const onSubmit = (data) => {
    const lib = { ...data, id };
    try {
      const storedData =
        editIndex !== null
          ? libraryrecord?.map((item) => (item.id === editIndex ? data : item))
          : [...libraryrecord, lib];
      editIndex !== null
        ? successMsg("Book record edited successfully")
        : successMsg("Book record added successsfully");
      setLibraryRecord(storedData);
      setEditIndex(null);
      setopen(false);
      reset();
    } catch (error) {}
  };
  const handleClose = () => {
    setopen(true);
  };
  const handleOpen = () => {
    setopen(false);
    setEditIndex(null);
  };
  const handleEdit = (item) => {
    setEditIndex(item?.id);
    reset(item);
    setopen(true);
  };
  return (
    <>
      {open === true ? (
        <Button
          onClick={handleOpen}
          className="btn mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          View All Books
        </Button>
      ) : (
        <></>
      )}
      {open === true ? (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <AddBooks control={control} errors={errors}/>
          </form>
        </>
      ) : (
        <>
          <AllBook handleClose={handleClose} handleEdit={handleEdit} />
        </>
      )}
    </>
  );
};

export default Libraray;
