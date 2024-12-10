"use client";
import DeleteModal from "@/component/Modal/DeleteModal";
import StudentLeave from "@/component/StudentLeave/StudentLeave";
import LeaveTable from "@/component/StudentLeave/StudentLeaveTable";
import { successMsg } from "@/component/Toastmsg/toaster";
import { StudentLeaveValidation } from "@/component/Validation/StudentLeaveValidation";
import UserContext from "@/context/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container } from "@mui/joy";
import { useSession } from "next-auth/react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

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
  const [value, setValue] = useState();
  const id = uuidv4();
  const handleChange = (event) => {
    setValue(event?.target?.value);
    reset();
  };
  const {data:session}=useSession()
const email=session?.user?.email
  const onSubmit = (data) => {
    const setid = { ...data, id,email };
    try {
      const storedData =
        editIndex !== null
          ? studentleave?.map((item) => (item?.id === editIndex ? data : item))
          : [...studentleave, setid];
      setEditIndex(null);
      setStudentLeave(storedData);
      editIndex !== null
        ? successMsg("Student leave updated successfully")
        : successMsg("Student leave added successfully");
      reset();
      setOpen(false);
    } catch (error) {}
    reset();
  };
  const handleEdit = (item) => {
    setEditIndex(item.id);
    setOpen(true);
    setValue(
      item?.leavedate !== undefined
        ? "singleday"
        : item?.multileave !== undefined
          ? "multipledays"
          : "singleday"
    );
    reset(item);
  };
  const onDelete = () => {
    const updatedData = studentleave.filter(
      (item, i) => item?.id !== deleteIndex
    );
    setStudentLeave(updatedData);
    successMsg("Student leave deleted successfully");
    setDeleteOpenModal(false);
  };
  const handleDelete = (item) => {
    setDeleteOpenModal(true);
    setDeleteIndex(item.id);
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
