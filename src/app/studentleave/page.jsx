"use client";
import DeleteModal from "@/component/Modal/DeleteModal";
import StudentLeave from "@/component/StudentLeave/StudentLeave";
import LeaveTable from "@/component/StudentLeave/StudentLeaveTable";
import { successMsg } from "@/component/Toastmsg/toaster";
import { StudentLeaveValidation } from "@/component/Validation/StudentLeaveValidation";
import UserContext from "@/context/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container } from "@mui/joy";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(StudentLeaveValidation) });
  const { studentleave, setStudentLeave } = useContext(UserContext);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
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
      editIndex !== null
        ? successMsg("Student leave edited successfully")
        : successMsg("Student leave added successfully");
      reset();
      setOpen(false);
    } catch (error) {}
    reset();
  };
  const handleEdit = (index) => {
    setEditIndex(index);
    setOpen(true);
    reset(studentleave[index]);
  };
  const handleDelete = (index) => {
    const updatedData = studentleave.filter((_, i) => i !== index);
    setStudentLeave(updatedData);
    successMsg("Student deleted successfully");
    setDeleteOpenModal(true);
  };
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false);
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
              <StudentLeave
                handleChange={handleChange}
                value={value}
                control={control}
                editIndex={editIndex}
                errors={errors}
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

export default Page;
