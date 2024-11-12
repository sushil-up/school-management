"use client";
import { LeaveRequest } from "@/component/LeaveRequest/LeaveRequest";
import LeaveTable from "@/component/LeaveRequest/LeaveTable";
import UserContext from "@/context/UserContext";
import { Button, Container } from "@mui/joy";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

const Leave = () => {
  const [open, setOpen] = useState(false);
  const { leaveRequest, setLeaveRequest } = useContext(UserContext);
  const { control, handleSubmit, reset } = useForm();
  const [value, setValue] = useState("singleday");
  const [editIndex, setEditIndex] = useState(null);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const onSubmit = (data) => {
    try {
      const storedData =
        editIndex !== null
          ? leaveRequest.map((item, index) =>
              index === editIndex ? data : item
            )
          : [...leaveRequest, data];
      setEditIndex(null);
      setLeaveRequest(storedData);
      reset();
      setOpen(false);
    } catch (error) {}
    reset();
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const handleDelete = (index) => {
    const updatedData = leaveRequest.filter((_, i) => i !== index);
    setLeaveRequest(updatedData);
  };
  const handleEdit = (index) => {
    setEditIndex(index);
    setOpen(true);
    reset(leaveRequest[index]);
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
              <LeaveRequest
                handleChange={handleChange}
                value={value}
                control={control}
                editIndex={editIndex}
              />
            </form>
          </>
        ) : (
          <>
            <LeaveTable handleDelete={handleDelete} handleEdit={handleEdit} />
          </>
        )}
      </Container>
    </>
  );
};

export default Leave;
