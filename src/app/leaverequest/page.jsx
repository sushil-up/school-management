"use client";
import { LeaveRequest } from "@/component/LeaveRequest/LeaveRequest";
import LeaveTable from "@/component/LeaveRequest/LeaveTable";
import DeleteModal from "@/component/Modal/DeleteModal";
import { successMsg } from "@/component/Toastmsg/toaster";
import { LeaveRequestValidation } from "@/component/Validation/LeaveRequestValidation";
import UserContext from "@/context/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container } from "@mui/joy";
import { useSession } from "next-auth/react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const Leave = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LeaveRequestValidation) });
  const [open, setOpen] = useState(false);
  const { leaveRequest, setLeaveRequest } = useContext(UserContext);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [value, setValue] = useState("singleday");
  const [editIndex, setEditIndex] = useState(null);
  const [loader, setLoader] = useState(false);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const id = uuidv4();
  const {data:session}=useSession()
  const email=session?.user?.email
  const onSubmit = (data) => {
    const setId = { ...data, id,email };
    try {
      const storedData =
        editIndex !== null
          ? leaveRequest.map((item) => (item.id === editIndex ? data : item))
          : [...leaveRequest, setId];
      setEditIndex(null);
      setLoader(true)
      editIndex !== null
        ? successMsg("Leave request is updated successfully")
        : successMsg("Leave Request is added successfully");

      setLeaveRequest(storedData);
      reset();
      setOpen(false);
    } catch (error) {}
  };
  const handleToggle = () => {
    setOpen(!open);
    reset()
  };
  const onDelete = () => {
    const updatedData = leaveRequest.filter((item) => item.id !== deleteIndex);
    setLeaveRequest(updatedData);
    setDeleteOpenModal(false);
    successMsg("Leave Request is deleted successfully")
  };
  const handleDelete = (item) => {
    setDeleteIndex(item.id);
    setDeleteOpenModal(true);
  };
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false);
  };
  const handleEdit = (item) => {
    setEditIndex(item.id);
    setOpen(true);
    reset(item);
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
                errors={errors}
                loader={loader}
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
