"use client";
import React, { useContext } from "react";
import Exam from "@/component/Exam/Exam";
import { v4 as uuidv4 } from "uuid";
import UserContext from "@/context/UserContext";
import { useForm } from "react-hook-form";
import { Container } from "@mui/joy";
import { successMsg } from "@/component/Toastmsg/toaster";
import { useRouter } from "next/navigation";
import { routesUrl } from "@/utils/pagesurl";
import { useSession } from "next-auth/react";
const Examination = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const {data:session}=useSession()
  const router= useRouter()
  if(session?.user?.role==="student"||session?.user?.role==="teacher"){
    router.replace(routesUrl.examTable)
  }
  const { examination, setExamination } = useContext(UserContext);
  const id = uuidv4();
  const onSubmit = (examdata) => {
    const setId = { ...examdata, id };
    const storedData = [...examination, setId];
    setExamination(storedData);
    reset();
    router.replace(routesUrl.examTable)
    successMsg("The exam schedule was successfully added")
  };
  return (
    <>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Exam control={control} errors={errors} />
        </form>
      </Container>
      
    </>
  );
};

export default Examination;
