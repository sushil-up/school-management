"use client";
import StudentLeave from "@/component/StudentLeave/StudentLeave";
import LeaveTable from "@/component/StudentLeave/StudentLeaveTable";
import { successMsg } from "@/component/Toastmsg/toaster";
import UserContext from "@/context/UserContext";
import { Button, Container } from "@mui/joy";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const [open, setOpen] = useState(false);
  const { handleSubmit, control , reset} = useForm();
  const { studentleave, setStudentLeave } =
    useContext(UserContext);
    const [editIndex, setEditIndex] = useState(null);
  const [value, setValue] = useState("singleday");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const onSubmit = (data) => {
    try {
      const storedData =
        editIndex !== null
          ? studentleave.map((item, index) =>
              index === editIndex ? data : item
            )
          : [...studentleave, data];
      setEditIndex(null);
      setStudentLeave(storedData);
      reset();
      setOpen(false);
    } catch (error) {}
    reset()
  };
  const handleEdit = (index) => {
    setEditIndex(index);
    setOpen(true);
    reset(studentleave[index]);
    successMsg("Student edited successfully");
  };
  const handleDelete = (index) => {
    const updatedData = studentleave.filter((_, i) => i !== index);
    setStudentLeave(updatedData);
    successMsg("Student deleted successfully");
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <>
      <Container>
        <div className="grid justify-items-end">
          <Button
            onClick={handleToggle}
            className="btn mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            {open ? "View Leave Request" : "Add Leave Request"}
          </Button>
        </div>
        {open ? (
          <>
         <form onSubmit={handleSubmit(onSubmit)}>
            <StudentLeave handleChange={handleChange} value={value} control={control} editIndex={editIndex}/>
            </form>
          </>
        ) : (
          <>
            <LeaveTable handleDelete={handleDelete } handleEdit={ handleEdit } />
          </>
        )}
      </Container>
    </>
  );
};

export default Page;
