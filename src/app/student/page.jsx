"use client";
import DeleteModal from "@/component/Modal/DeleteModal";
import Form from "@/component/StudentForm/Form";
import StudentTable from "@/component/StudentForm/StudentTable";
import { successMsg } from "@/component/Toastmsg/toaster";
import { StudentValidation } from "@/component/Validation/StudentValidation";
import UserContext from "@/context/UserContext";
import { routesUrl } from "@/utils/pagesurl";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container } from "@mui/joy";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
const Student = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(StudentValidation),
    defaultValues: {
      name: "",
      fathername: "",
      mothername: "",
      class: "",
      section: "",
      rollno: "",
      gender: "",
      dob: new Date(),
      address: "",
    },
  });
  const { data: session } = useSession();
  const { studentData, setStudentData } = useContext(UserContext);
  const [editIndex, setEditIndex] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [update, setUpdate] = useState(false);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [loader, setLoader] = useState(false);
  const studentid = uuidv4();
  const router=useRouter()
  if (session?.user?.role==="student"){
    router.replace(routesUrl.studentleave)
  }
  const onSubmit = (formData) => {
    const setid = { ...formData, studentid }
    try {
      const storedData =
        editIndex !== null
          ? studentData?.map((item, index) =>
              item.studentid === editIndex ? formData : item
            )
          : [...studentData, setid];
      setEditIndex(null);
      setLoader(true)
      editIndex !== null
        ? successMsg("Student information has been successfully edited.")
        : successMsg("Student record created successfully.");
      setStudentData(storedData);
      reset();
      setOpenForm(false);
    } catch (error) {}
  };
  const handleDelete = (item) => {
    setDeleteIndex(item.studentid);
    setDeleteOpenModal(true);
  };
  const onDelete = () => {
    const updatedData = studentData?.filter(
      (item, i) => item.studentid !== deleteIndex
    );
    setStudentData(updatedData);
    setDeleteOpenModal(false);
    successMsg("Student deleted successfully");
  };
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false);
  };
  const handleEdit = (item) => {
    setEditIndex(item.studentid);
    reset(item);
    setOpenForm(true);
    setUpdate(true);
  };
  const handleOpen = () => {
    setOpenForm(true);
    setUpdate(false);
    reset({
      name: "",
      fathername: "",
      mothername: "",
      class: "",
      section: "",
      rollno: "",
      gender: "",
      dob: new Date(),
      address: "",
    });
  };
  const handleClose = () => {
    setOpenForm(false);
  };
  return (
    <>
      <Container>
        <div className="grid justify-items-end ">
          {openForm === true || session?.user?.role === "student"||session?.user?.role === "teacher" ? (
            <></>
          ) : (
            <>
              <Button
                onClick={handleOpen}
                className="btn mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Add Student
              </Button>
            </>
          )}
        </div>
        {openForm === true ? (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Form
                control={control}
                update={update}
                errors={errors}
                loader={loader}
                handleClose={handleClose}
              />
            </form>
          </>
        ) : (
          <>
            <StudentTable
              studentData={studentData}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </>
        )}

        <br />
      </Container>
      <DeleteModal
        onDelete={onDelete}
        deleteOpenModal={deleteOpenModal}
        deleteMessage="Are you certain you want to proceed with this deletion?"
        deleteHandleModalClose={deleteHandleModalClose}
      />
    </>
  );
};

export default Student;
