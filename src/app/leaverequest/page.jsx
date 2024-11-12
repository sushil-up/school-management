"use client";
import { LeaveRequest } from "@/component/LeaveRequest/LeaveRequest";
import LeaveTable from "@/component/LeaveRequest/LeaveTable";
import DeleteModal from "@/component/Modal/DeleteModal";
import UserContext from "@/context/UserContext";
import { Button, Container } from "@mui/joy";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

const Leave = () => {
  const [open, setOpen] = useState(false);
  const { leaveRequest, setLeaveRequest } = useContext(UserContext);
  const { control, handleSubmit, reset } = useForm();
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
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
  const onDelete = () => {
    const updatedData = leaveRequest.filter((_, i) => i !== deleteIndex);
    setLeaveRequest(updatedData);
    setDeleteOpenModal(false);
  };
  const handleDelete = (index) => {
    setDeleteIndex(index);
    setDeleteOpenModal(true);
  };
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false);
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
      <DeleteModal
        onDelete={onDelete}
        deleteMessage="Are you certain you want to proceed with this deletion?"
        deleteOpenModal={deleteOpenModal}
        deleteHandleModalClose={deleteHandleModalClose}
      />
    </>
  );
};

export default Leave;
